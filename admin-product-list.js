// Supabase Configuration
const SUPABASE_URL = 'https://duhauvyhekixzaxvbgze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aGF1dnloZWtpeHpheHZiZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg2NjksImV4cCI6MjA4NDQ3NDY2OX0.ytteNJ0FFjA_2pl-1bguTBASJVtkyRa8zPQdLb4eX38';

let currentBrand = '';
let allProducts = [];

document.addEventListener('DOMContentLoaded', function() {
    if (!checkLogin()) return;
    
    // Get brand from URL
    const urlParams = new URLSearchParams(window.location.search);
    currentBrand = urlParams.get('brand');
    
    if (!currentBrand) {
        alert('Brend tanlanmagan');
        window.location.href = 'admin-brand-select.html?action=manage';
        return;
    }
    
    // Set brand name
    document.getElementById('brandInfo').textContent = getBrandName(currentBrand) + ' mahsulotlari';
    
    // Load products
    loadProducts();
    
    // Setup search
    setupSearch();
});

function checkLogin() {
    const loginTime = parseInt(localStorage.getItem('loginTime') || '0');
    const hoursSinceLogin = (Date.now() - loginTime) / (1000 * 60 * 60);
    
    if (!localStorage.getItem('adminLoggedIn') || hoursSinceLogin >= 24) {
        localStorage.clear();
        window.location.href = 'admin/login';
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

async function loadProducts() {
    try {
        // Fetch products for this brand from Supabase
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/products?brand=eq.${encodeURIComponent(currentBrand)}&order=name.asc`,
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
        
        allProducts = await response.json();
        console.log('Mahsulotlar yuklandi:', allProducts.length);
        
        displayProducts(allProducts);
        
    } catch (error) {
        console.error('Mahsulotlarni yuklashda xato:', error);
        document.getElementById('productsContainer').innerHTML = `
            <div class="no-products">
                Xato yuz berdi: ${error.message}
            </div>
        `;
    }
}

function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    
    if (!products || products.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                📭 Bu brenda mahsulot topilmadi.<br>
                <button onclick="goToAddProduct()" style="margin-top: 15px; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    ➕ Yangi mahsulot qo'shish
                </button>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    products.forEach(product => {
        // Check if image is base64 or URL
        let imageSrc = product.img;
        if (product.img && product.img.startsWith('data:image')) {
            // It's base64, use it directly
            imageSrc = product.img;
        } else if (product.img && product.img.trim() !== '') {
            // It's a regular URL
            imageSrc = product.img;
        } else {
            // No image
            imageSrc = 'img/default.jpg';
        }
        

        html += `  

                <div class="ic-box" data-id="${product.id}">
                    <div class="ic-img">
                        <img src="${imageSrc}" alt="${product.name}" class="product-image">
                    </div>
                    
                    
                <div class="ic-details">
                    <div class="ic-name">${product.name} <div class="ic-gram">${product.gram}</div></div>
                    <span class="ic-price">${product.price}</span>
                </div>

            </div>

                <div class="product-actions">
                    <button class="action-btn edit-btn" onclick="editProduct('${product.id}')">
                        ✏️ Tahrirlash
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteProduct('${product.id}', '${product.name}')">
                        🗑️ O'chirish
                    </button>
                </div>
            
            
        `;
    });
    
    container.innerHTML = html;
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayProducts(allProducts);
            return;
        }
        
        const filtered = allProducts.filter(product => {
            return (
                (product.name && product.name.toLowerCase().includes(searchTerm)) ||
                (product.id && product.id.toLowerCase().includes(searchTerm)) ||
                (product.price && product.price.toLowerCase().includes(searchTerm))
            );
        });
        
        displayProducts(filtered);
    });
}

function editProduct(productId) {
      
    window.location.href = `admin-product-edit.html?brand=${currentBrand}&id=${productId}`;
}

function deleteProduct(productId, productName) {
    if (!confirm(`"${productName}" mahsulotini o'chirishni istaysizmi?\n\nBu amalni qaytarib bo'lmaydi.`)) {
        return;
    }
    
    const deleteBtn = event.target;
    deleteBtn.disabled = true;
    deleteBtn.textContent = 'Oʻchirilmoqda...';
    
    // Delete from Supabase
    fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(productId)}`, {
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
            // Remove from local array and UI
            allProducts = allProducts.filter(p => p.id !== productId);
            displayProducts(allProducts);
        } else {
            throw new Error('Oʻchirishda xato');
        }
    })
    .catch(error => {
        console.error('Oʻchirishda xato:', error);
        alert('❌ Xato: Mahsulotni o\'chirib boʻlmadi');
        deleteBtn.disabled = false;
        deleteBtn.textContent = '🗑️ O\'chirish';
    });
}

function goToAddProduct() {
    window.location.href = `admin-product-form.html?brand=${currentBrand}`;
}

function goBack() {
    window.location.href = 'admin-brand-select.html?action=manage';
}

function logout() {
    if (confirm('Chiqishni istaysizmi?')) {
        localStorage.clear();
        window.location.href = 'admin/login';
    }
}