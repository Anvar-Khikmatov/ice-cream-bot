/*

// Check login first
document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
    loadDashboardData();
});

function checkLogin() {
    const loginTime = parseInt(localStorage.getItem('loginTime') || '0');
    const hoursSinceLogin = (Date.now() - loginTime) / (1000 * 60 * 60);
    
    // If no login or expired (24 hours)
    if (!localStorage.getItem('adminLoggedIn') || hoursSinceLogin >= 24) {
        localStorage.clear();
        window.location.href = 'admin-login.html';
        return false;
    }
    
    // Update welcome message
    const username = localStorage.getItem('adminUsername') || 'Admin';
    document.getElementById('welcomeMessage').textContent = `Xush kelibsiz, ${username}!`;
    
    // Reset login timer (extend session)
    localStorage.setItem('loginTime', Date.now());
    
    return true;
}

// Load dashboard data (product count)
async function loadDashboardData() {
    try {
        const SUPABASE_URL = 'https://duhauvyhekixzaxvbgze.supabase.co';
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aGF1dnloZWtpeHpheHZiZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg2NjksImV4cCI6MjA4NDQ3NDY2OX0.ytteNJ0FFjA_2pl-1bguTBASJVtkyRa8zPQdLb4eX38';
        
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/products?select=count`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );
        
        if (response.ok) {
            const data = await response.json();
            document.getElementById('totalProducts').textContent = data[0].count || '0';
        }
    } catch (error) {
        console.error('Error loading stats:', error);
        document.getElementById('totalProducts').textContent = 'Xatolik';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = 'admin-login.html';
    }
}
    */



document.addEventListener('DOMContentLoaded', async function() {
    const loggedIn = await checkLogin();
    if (!loggedIn) return;

    const username = sessionStorage.getItem('adminUsername') || 'Admin';
    document.getElementById('welcomeMessage').textContent = `Xush kelibsiz, ${username}!`;

    loadDashboardData();
});

async function loadDashboardData() {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/products?select=count`,
            { headers: getAuthHeaders() }
        );

        if (response.ok) {
            const data = await response.json();
            document.getElementById('totalProducts').textContent = data[0].count || '0';
        }
    } catch (error) {
        console.error('Error loading stats:', error);
        document.getElementById('totalProducts').textContent = 'Xatolik';
    }
}