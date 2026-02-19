// Supabase Configuration
const SUPABASE_URL = 'https://duhauvyhekixzaxvbgze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aGF1dnloZWtpeHpheHZiZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg2NjksImV4cCI6MjA4NDQ3NDY2OX0.ytteNJ0FFjA_2pl-1bguTBASJVtkyRa8zPQdLb4eX38';

let currentProductId = '';
let currentBrand = '';
let currentProductData = null;
let newMainImage = null;
let newGalleryImages = [];
let removeMainImageOnSave = false;

document.addEventListener('DOMContentLoaded', function() {
    if (!checkLogin()) return;
    
    // Get product ID and brand from URL
    const urlParams = new URLSearchParams(window.location.search);
    currentProductId = urlParams.get('id');
    currentBrand = urlParams.get('brand');
    
    if (!currentProductId || !currentBrand) {
        alert('Ma\'lumotlar yetarli emas');
        window.location.href = 'admin-brand-select.html?action=manage';
        return;
    }
    
    // Load product data
    loadProductData();
    
    // Setup image upload handlers
    setupImageUpload();
});

function checkLogin() {
    const loginTime = parseInt(localStorage.getItem('loginTime') || '0');
    const hoursSinceLogin = (Date.now() - loginTime) / (1000 * 60 * 60);
    
    if (!localStorage.getItem('adminLoggedIn') || hoursSinceLogin >= 24) {
        localStorage.clear();
        window.location.href = 'admin-login.html';
        return false;
    }
    
    // Reset login timer
    localStorage.setItem('loginTime', Date.now());
    return true;
}

async function loadProductData() {
    try {
        // Fetch product data from Supabase
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(currentProductId)}`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`Xato: ${response.status}`);
        }
        
        const products = await response.json();
        
        if (products.length === 0) {
            alert('Mahsulot topilmadi');
            window.location.href = `admin-product-list.html?brand=${currentBrand}`;
            return;
        }
        
        currentProductData = products[0];
        console.log('Mahsulot ma\'lumotlari yuklandi:', currentProductData);
        
        // Fill form with existing data
        fillFormData();
        
    } catch (error) {
        console.error('Mahsulot ma\'lumotlarini yuklashda xato:', error);
        alert(`Xato: ${error.message}`);
        window.location.href = `admin-product-list.html?brand=${currentBrand}`;
    }
}

function fillFormData() {
    // Fill all form fields
    document.getElementById('productId').value = currentProductData.id;
    document.getElementById('brandName').value = getBrandName(currentProductData.brand);
    document.getElementById('productName').value = currentProductData.name || '';
    document.getElementById('productPrice').value = currentProductData.price || '';
    document.getElementById('productGram').value = currentProductData.gram || '';
    document.getElementById('boxNum').value = currentProductData.boxnum || '';
    document.getElementById('productDescription').value = currentProductData.galleryname || '';
    
    // Display current main image
    const mainImgElement = document.getElementById('currentMainImage');
    const imageInfo = document.getElementById('imageInfo');
    
    if (currentProductData.img && currentProductData.img.trim() !== '') {
        if (currentProductData.img.startsWith('data:image')) {
            // Base64 image
            mainImgElement.src = currentProductData.img;
            imageInfo.textContent = 'Rasm: Base64 formatda';
        } else if (currentProductData.img.startsWith('http')) {
            // URL image
            mainImgElement.src = currentProductData.img;
            imageInfo.textContent = 'Rasm: URL manzilida';
        } else {
            // Local path
            mainImgElement.src = currentProductData.img;
            imageInfo.textContent = `Rasm: ${currentProductData.img}`;
        }
    } else {
        mainImgElement.style.display = 'none';
        imageInfo.textContent = 'Rasm mavjud emas';
    }
    
    // Display current gallery images
    displayCurrentGallery();
}

function getBrandName(brandId) {
    const brands = {
        'dairy': 'Dairy Classic',
        'icegold': 'Ice & GolD',
        'muzqaymoqlar': 'Muzqaymoqlar',
        'naturel': 'Naturel',
        'sodiqSavdo': 'Sodiq Savdo',
        'zarli': 'Zarli',
        'korovka': 'Коровка из Кореновки',
        'bahroma': 'Bahroma',
        'svitlogore': 'Свитлогорье'
    };
    return brands[brandId] || brandId;
}

function displayCurrentGallery() {
    const galleryContainer = document.getElementById('currentGallery');
    galleryContainer.innerHTML = '';
    
    let galleryImages = [];
    
    // Parse gallery images (could be array or JSON string)
    if (currentProductData.viewimg) {
        try {
            if (typeof currentProductData.viewimg === 'string') {
                galleryImages = JSON.parse(currentProductData.viewimg);
            } else if (Array.isArray(currentProductData.viewimg)) {
                galleryImages = currentProductData.viewimg;
            }
        } catch (e) {
            console.warn('Galereya rasmlarini o\'qishda xato:', e);
        }
    }
    
    if (galleryImages.length === 0) {
        galleryContainer.innerHTML = '<div class="form-hint">Galereya rasmlari mavjud emas</div>';
        return;
    }
    
    galleryImages.forEach((imgSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${imgSrc}" class="gallery-preview" alt="Galereya ${index + 1}">
            <button class="remove-image" onclick="removeCurrentGalleryImage(${index})">×</button>
        `;
        galleryContainer.appendChild(galleryItem);
    });
}


function removeMainImage() {
    if (confirm('Asosiy rasmni olib tashlamoqchimisiz?\n\nMahsulot standart rasm bilan ko\'rinadi.')) {
        // Set flag to remove image on save
        removeMainImageOnSave = true;
        
        // Clear UI
        document.getElementById('currentMainImage').style.display = 'none';
        document.getElementById('imageInfo').textContent = 'Rasm olib tashlandi. Saqlashni unutmang!';
        document.getElementById('imageUploadArea').classList.remove('active');
        document.getElementById('mainImagePreview').style.display = 'none';
        
        // Clear any selected new image
        newMainImage = null;
        document.getElementById('mainImageInput').value = '';
    }
}



function removeCurrentGalleryImage(index) {
    if (confirm('Bu rasmni olib tashlamoqchimisiz?')) {
        let galleryImages = [];
        
        if (currentProductData.viewimg) {
            try {
                if (typeof currentProductData.viewimg === 'string') {
                    galleryImages = JSON.parse(currentProductData.viewimg);
                } else if (Array.isArray(currentProductData.viewimg)) {
                    galleryImages = currentProductData.viewimg;
                }
            } catch (e) {
                console.warn('Galereya rasmlarini o\'qishda xato:', e);
            }
        }
        
        galleryImages.splice(index, 1);
        currentProductData.viewimg = galleryImages;
        
        // Update display
        displayCurrentGallery();
        alert('Rasm olib tashlandi. Saqlash tugmasini bosganda yangilanadi.');
    }
}

function setupImageUpload() {
    // Main image handler
    document.getElementById('mainImageInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            newMainImage = file;
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('mainImagePreview');
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Gallery images handler
    document.getElementById('galleryInput').addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                addNewGalleryPreview(e.target.result, file);
            };
            reader.readAsDataURL(file);
        });
    });
}

function toggleImageUpload() {
    const uploadArea = document.getElementById('imageUploadArea');
    uploadArea.classList.toggle('active');
}

function toggleGalleryUpload() {
    const uploadArea = document.getElementById('galleryUploadArea');
    uploadArea.classList.toggle('active');
}

function addNewGalleryPreview(imageSrc, file) {
    newGalleryImages.push({ src: imageSrc, file: file });
    updateNewGalleryPreview();
}

function updateNewGalleryPreview() {
    const galleryDiv = document.getElementById('galleryPreview');
    galleryDiv.innerHTML = '';
    
    newGalleryImages.forEach((img, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'gallery-item';
        imageItem.innerHTML = `
            <img src="${img.src}" class="gallery-preview">
            <button class="remove-image" onclick="removeNewGalleryImage(${index})">×</button>
        `;
        galleryDiv.appendChild(imageItem);
    });
}

function removeNewGalleryImage(index) {
    newGalleryImages.splice(index, 1);
    updateNewGalleryPreview();
}

async function updateProduct() {
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saqlanmoqda...';
    
    try {
        // Validate form
        const productData = validateForm();
        if (!productData) {
            saveBtn.disabled = false;
            saveBtn.textContent = '💾 Saqlash';
            return;
        }
        
        console.log('Yangilash ma\'lumotlari:', productData);
        
        // Prepare update data
        const updateData = {
            name: productData.name,
            gram: productData.gram,
            price: productData.price,
            boxnum: productData.boxNum || null,
            galleryname: productData.description
        };
        
        // Update main image if new one uploaded
        // if (newMainImage) {
        //     // Convert to base64 for now
        //     const imageUrl = await fileToBase64(newMainImage);
        //     updateData.img = imageUrl;
        // }
        if (removeMainImageOnSave) {
        // User wants to REMOVE the image
            updateData.img = null; // Or empty string ''
        } else if (newMainImage) {
            // User wants to REPLACE with new image
            const imageUrl = await fileToBase64(newMainImage);
            updateData.img = imageUrl;
        }



        
        // Update gallery images if new ones added
        if (newGalleryImages.length > 0) {
            // Get current gallery
            let currentGallery = [];
            if (currentProductData.viewimg) {
                try {
                    if (typeof currentProductData.viewimg === 'string') {
                        currentGallery = JSON.parse(currentProductData.viewimg);
                    } else if (Array.isArray(currentProductData.viewimg)) {
                        currentGallery = currentProductData.viewimg;
                    }
                } catch (e) {
                    console.warn('Galereya rasmlarini o\'qishda xato:', e);
                }
            }
            
            // Add new gallery images
            for (let i = 0; i < newGalleryImages.length; i++) {
                const base64Image = await fileToBase64(newGalleryImages[i].file);
                currentGallery.push(base64Image);
            }
            
            updateData.viewimg = currentGallery;
        } else if (currentProductData.viewimg) {
            // Keep current gallery if no new images
            updateData.viewimg = currentProductData.viewimg;
        }
        
        // Update in Supabase
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(currentProductId)}`,
            {
                method: 'PATCH',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(updateData)
            }
        );
        
        if (response.ok) {
            alert('✅ Mahsulot muvaffaqiyatli yangilandi!');
            // Go back to product list
             removeMainImageOnSave = false;

            setTimeout(() => {
                window.location.href = `admin-product-list.html?brand=${currentBrand}`;
            }, 1000);
        } else {
            const error = await response.text();
            throw new Error(`Ma'lumotlar bazasi xatosi: ${error}`);
        }
        
    } catch (error) {
        console.error('Yangilashda xato:', error);
        alert(`❌ Xato: ${error.message}`);
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = '💾 Saqlash';
    }
}

function validateForm() {
    const name = document.getElementById('productName').value.trim();
    const price = document.getElementById('productPrice').value.trim();
    const gram = document.getElementById('productGram').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    
    if (!name ) {
        alert('Iltimos, barcha majburiy maydonlarni to\'ldiring (*)');
        return null;
    }
    
    // Format price (add " UZS" if not present)
    let formattedPrice = price;
    if (!price.includes('UZS') && !price.includes('сум') && !price.includes('so‘m')) {
        formattedPrice = price + ' UZS';
    }
    
    // Format gram (add "gr" if not present)
    let formattedGram = gram;
    if (!gram.toLowerCase().includes('gr') && !gram.toLowerCase().includes('g')) {
        formattedGram = gram + 'gr';
    }
    
    return {
        name: name,
        price: formattedPrice,
        gram: formattedGram,
        boxNum: document.getElementById('boxNum').value.trim(),
        description: description
    };
}

// function fileToBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             resolve(e.target.result);
//         };
//         reader.onerror = function(e) {
//             reject(new Error('Rasmni o\'qishda xato'));
//         };
//         reader.readAsDataURL(file);
//     });
// }

async function fileToBase64(file) {
    const ext = file.name.split('.').pop();
    const fullPath = `products/${currentProductId}_${Date.now()}.${ext}`;

    const response = await fetch(
        `${SUPABASE_URL}/storage/v1/object/product-images/${fullPath}`,
        {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': file.type
            },
            body: file
        }
    );

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Image upload failed: ${err}`);
    }

    return `${SUPABASE_URL}/storage/v1/object/public/product-images/${fullPath}`;
}


function deleteProduct() {
    if (!confirm(`"${currentProductData.name}" Mahsulotini butunlay o'chirishni istaysizmi?\n\nBu amalni qaytarib bo'lmaydi.`)) {
        return;
    }
    
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.disabled = true;
    deleteBtn.textContent = 'Oʻchirilmoqda...';
    
    // Delete from Supabase
    fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(currentProductId)}`, {
        method: 'DELETE',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Prefer': 'return=minimal'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('✅ Mahsulot muvaffaqiyatli o\'chirildi!');
            window.location.href = `admin-product-list.html?brand=${currentBrand}`;
        } else {
            throw new Error('Oʻchirishda xato');
        }
    })
    .catch(error => {
        console.error('Oʻchirishda xato:', error);
        alert('❌ Xato: Mahsulotni o\'chirib boʻlmadi');
        deleteBtn.disabled = false;
        deleteBtn.textContent = '🗑️ Mahsulotni O\'chirish';
    });
}

function goBack() {
    window.location.href = `admin-product-list.html?brand=${currentBrand}`;
}

function logout() {
    if (confirm('Chiqishni istaysizmi?')) {
        localStorage.clear();
        window.location.href = 'admin-login.html';
    }
}