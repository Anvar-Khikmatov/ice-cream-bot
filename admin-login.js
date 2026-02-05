// Supabase Configuration
const SUPABASE_URL = 'https://duhauvyhekixzaxvbgze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aGF1dnloZWtpeHpheHZiZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg2NjksImV4cCI6MjA4NDQ3NDY2OX0.ytteNJ0FFjA_2pl-1bguTBASJVtkyRa8zPQdLb4eX38';

// Password hashing function (SHA-256)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Login function
async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorElement = document.getElementById('errorMessage');
    
    // Clear previous error
    errorElement.style.display = 'none';
    
    // Validate input
    if (!username || !password) {
        errorElement.textContent = '❌ Iltimos, foydalanuvchi nomi va parolni kiriting';
        errorElement.style.display = 'block';
        return;
    }
    
    try {
        console.log('Attempting login for user:', username);
        
        // 1. Fetch user from database
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/admin_users?username=eq.${encodeURIComponent(username)}&select=*`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`Database error: ${response.status}`);
        }
        
        const users = await response.json();
        console.log('User found:', users.length > 0);
        
        // 2. Check if user exists
        if (users.length === 0) {
            errorElement.textContent = '❌ User not found';
            errorElement.style.display = 'block';
            return;
        }
        
        // 3. Hash the input password
        const hashedInput = await hashPassword(password);
        
        // 4. Compare with stored hash
        if (hashedInput === users[0].password_hash) {
            console.log('✅ Password matches! Login successful');
            
            // Save login state
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
            localStorage.setItem('loginTime', Date.now());
            
            // Redirect to dashboard
            window.location.href = 'admin-dashboard.html';
            
        } else {
            console.log('❌ Password mismatch');
            errorElement.textContent = '❌ Invalid password';
            errorElement.style.display = 'block';
        }
        
    } catch (error) {
        console.error('Login error:', error);
        errorElement.textContent = `❌ Error: ${error.message}`;
        errorElement.style.display = 'block';
    }
}

// Allow Enter key to submit form
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            login();
        }
    });
});

// Optional: Check if already logged in (redirect to dashboard)
if (localStorage.getItem('adminLoggedIn') === 'true') {
    // Check if login is not expired (24 hours)
    const loginTime = parseInt(localStorage.getItem('loginTime') || '0');
    const hoursSinceLogin = (Date.now() - loginTime) / (1000 * 60 * 60);
    
    if (hoursSinceLogin < 24) {
        window.location.href = 'admin-dashboard.html';
    } else {
        // Clear expired session
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('loginTime');
    }
}