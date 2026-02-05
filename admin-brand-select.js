// Check login first
document.addEventListener('DOMContentLoaded', function() {
    if (!checkLogin()) return;
    
    // Get action from URL (?action=add or ?action=manage)
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action'); // 'add' or 'manage'
    
    if (!action || (action !== 'add' && action !== 'manage')) {
        alert('Invalid action');
        window.location.href = 'admin-dashboard.html';
        return;
    }
    
    // Set page title based on action
    const actionText = action === 'add' ? 'Yangi mahsulot qo‘shish…' : 'Mahsulotlarni boshqarish';
    document.getElementById('actionInfo').textContent = `${actionText}...`;
    
    // Load brands
    loadBrands(action);
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

// Same brand structure as your main app
const BRANDS = [
    { id: 'dairy', name: 'Dairy Classic', img: 'img/logo/dairy.jpg' },
    { id: 'icegold', name: 'Ice & GolD', img: 'img/logo/ice&gold.jpg' },
    { id: 'muzqaymoqlar', name: 'Muzqaymoqlar', img: 'img/logo/muzqaymoqlar.jpg' },
    { id: 'naturel', name: 'Naturel', img: 'img/logo/naturel.webp' },
    { id: 'sodiqSavdo', name: 'Sodiq Savdo', img: 'img/logo/ss.jpg' },
    { id: 'zarli', name: 'Zarli', img: 'img/logo/zarli.jpg' },
    { id: 'korovka', name: 'Коровка из Кореновки', img: 'img/logo/korovka.jpg' },
    { id: 'bahroma', name: 'Bahroma', img: 'img/logo/bahroma.jpg' },
    { id: 'svitlogore', name: 'Свитлогорье', img: 'img/logo/svitlogore.jpg' }
];

function loadBrands(action) {
    const brandsGrid = document.getElementById('brandsGrid');
    brandsGrid.innerHTML = '';
    
    BRANDS.forEach(brand => {
        const brandCard = document.createElement('div');
        brandCard.className = 'admin-brand-card';
        brandCard.innerHTML = `
            <img src="${brand.img}" alt="${brand.name}" class="admin-brand-img" loading="lazy">
            <div class="admin-brand-name">${brand.name}</div>
        `;
        
        brandCard.onclick = () => {
            // Redirect based on action
            if (action === 'add') {
                window.location.href = `admin-product-form.html?brand=${brand.id}`;
            } else {
                window.location.href = `admin-product-list.html?brand=${brand.id}`;
            }
        };
        
        brandsGrid.appendChild(brandCard);
    });
}

function goBack() {
    window.location.href = 'admin-dashboard.html';
}

function logout() {
    if (confirm('Chiqishni xohlaysizmi?')) {
        localStorage.clear();
        window.location.href = 'admin-login.html';
    }
}