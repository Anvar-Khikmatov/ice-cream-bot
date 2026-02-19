// Supabase Configuration
const SUPABASE_URL = 'https://duhauvyhekixzaxvbgze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aGF1dnloZWtpeHpheHZiZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg2NjksImV4cCI6MjA4NDQ3NDY2OX0.ytteNJ0FFjA_2pl-1bguTBASJVtkyRa8zPQdLb4eX38';

let selectedBrand = '';
let mainImageFile = null;
let galleryImages = [];

document.addEventListener('DOMContentLoaded', function() {
    if (!checkLogin()) return;
    
    // Get brand from URL
    const urlParams = new URLSearchParams(window.location.search);
    selectedBrand = urlParams.get('brand');
    
    if (!selectedBrand) {
        alert('No brand selected');
        window.location.href = 'admin-brand-select.html?action=add';
        return;
    }
    
    // Set brand name in form
    document.getElementById('pageTitle').textContent = `${getBrandName(selectedBrand)}`;
    document.getElementById('brandName').value = getBrandName(selectedBrand);
    
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

function setupImageUpload() {
    // Main image handler
    document.getElementById('mainImageInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            mainImageFile = file;
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
                addGalleryPreview(e.target.result, file);
            };
            reader.readAsDataURL(file);
        });
    });
}

function addGalleryPreview(imageSrc, file) {
    galleryImages.push({ src: imageSrc, file: file });
    
    const galleryDiv = document.getElementById('galleryPreview');
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    imageItem.innerHTML = `
        <img src="${imageSrc}" class="gallery-preview">
        <button class="remove-image" onclick="removeGalleryImage(${galleryImages.length - 1})">×</button>
    `;
    galleryDiv.appendChild(imageItem);
}

function removeGalleryImage(index) {
    galleryImages.splice(index, 1);
    updateGalleryPreview();
}

function updateGalleryPreview() {
    const galleryDiv = document.getElementById('galleryPreview');
    galleryDiv.innerHTML = '';
    
    galleryImages.forEach((img, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.innerHTML = `
            <img src="${img.src}" class="gallery-preview">
            <button class="remove-image" onclick="removeGalleryImage(${index})">×</button>
        `;
        galleryDiv.appendChild(imageItem);
    });
}

async function saveProduct() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saqlanmoqda...';
    
    try {
        // Validate form
        const productData = validateForm();
        if (!productData) {
            submitBtn.disabled = false;
            submitBtn.textContent = '➕ Mahsulot qo\'shish';
            return;
        }
        
        console.log('Saving product:', productData);
        
        // Upload main image to Supabase Storage
        let mainImageUrl = '';
        if (mainImageFile) {
            mainImageUrl = await uploadToSupabaseStorage(mainImageFile, `products/${productData.id}_main`);
            console.log('Main image uploaded:', mainImageUrl);
        }
        
        // Upload gallery images
        const galleryUrls = [];
        for (let i = 0; i < galleryImages.length; i++) {
            const url = await uploadToSupabaseStorage(
                galleryImages[i].file, 
                `products/${productData.id}_gallery_${i}`
            );
            galleryUrls.push(url);
        }
        
        // Prepare data for Supabase
        const supabaseData = {
            name: productData.name,
            brand: selectedBrand,
            gram: productData.gram,
            price: productData.price,
            img: mainImageUrl || 'img/default.jpg', // Use default if no image
            viewimg: galleryUrls.length > 0 ? galleryUrls : null,
            boxnum: productData.boxNum || null,
            galleryname: productData.description,
            id: productData.id
        };
        
        // Save to Supabase products table
        const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(supabaseData)
        });
        
        if (response.ok) {
            alert('✅ Mahsulot muvaffaqiyatli qo‘shildi!');
            // Reset form
            resetForm();
        } else {
            const error = await response.text();
            throw new Error(`Database error: ${error}`);
        }
        
    } catch (error) {
        console.error('Error saving product:', error);
        alert(`❌ Error: ${error.message}`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '➕ Mahsulot qo\'shish';
    }
}

function validateForm() {
    const name = document.getElementById('productName').value.trim();
    const price = document.getElementById('productPrice').value.trim();
    const gram = document.getElementById('productGram').value.trim();
    const productId = document.getElementById('productId').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    
    if (!name || !productId ) {
        alert('Iltimos, barcha majburiy maydonlarni (*) to‘ldiring');
        return null;
    }
    
    if (!mainImageFile) {
        if (!confirm('Asosiy rasm yuklanmadi. Davom etilsinmi?')) {
            return null;
        }
    }
    
    // Format price (add " UZS" if not present)
    let formattedPrice = price;
    if (!price.includes('UZS')) {
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
        id: productId.toLowerCase(),
        description: description
    };
}

// async function uploadToSupabaseStorage(file, path) {
//     // For now, we'll use a placeholder URL since Supabase Storage needs special setup
//     // In production, you would use: supabase.storage.from('bucket').upload(path, file)
    
//     console.log('Would upload to:', path, file.name);
//     return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             resolve(e.target.result); // Returns base64 data URL
//         };
//         reader.readAsDataURL(file);
//     });
// }

async function uploadToSupabaseStorage(file, path) {
    const ext = file.name.split('.').pop();
    const fullPath = `${path}_${Date.now()}.${ext}`;

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


function resetForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productGram').value = '';
    document.getElementById('boxNum').value = '';
    document.getElementById('productId').value = '';
    document.getElementById('productDescription').value = '';
    
    // Reset images
    mainImageFile = null;
    galleryImages = [];
    document.getElementById('mainImagePreview').style.display = 'none';
    document.getElementById('galleryPreview').innerHTML = '';
    
    // Reset file inputs
    document.getElementById('mainImageInput').value = '';
    document.getElementById('galleryInput').value = '';
}

function goBack() {
    window.location.href = `admin-brand-select.html?action=add`;
}

function logout() {
    if (confirm('Chiqishni xohlaysizmi?')) {
        localStorage.clear();
        window.location.href = 'admin-login.html';
    }
}