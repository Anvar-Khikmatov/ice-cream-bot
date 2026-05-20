/*

const SUPABASE_URL = 'https://duhauvyhekixzaxvbgze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aGF1dnloZWtpeHpheHZiZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg2NjksImV4cCI6MjA4NDQ3NDY2OX0.ytteNJ0FFjA_2pl-1bguTBASJVtkyRa8zPQdLb4eX38';



async function hashPassword(password) {
  // Convert password to Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Hash with SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}


async function login(username, password) {
  // 1. Fetch admin user from Supabase
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/admin_users?username=eq.${username}`,
    { headers: { 'apikey': SUPABASE_KEY } }
  );
  
  const admin = await response.json();
  
  if (admin.length === 0) {
    return false; // User not found
  }
  
  // 2. Hash input password and compare with stored hash
  const hashedInput = await hashPassword(password);
  if (hashedInput === admin[0].password_hash) {
    return true; // Login successful
  }
  
  return false; // Wrong password
}



async function createAdmin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (!username || !password) {
    alert('Please enter both username and password');
    return;
  }
  
  console.log('Creating admin account...');
  
  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);
    console.log('Password hashed:', hashedPassword.substring(0, 10) + '...');
    
    // Insert into Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/admin_users`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        username: username,
        password_hash: hashedPassword
      })
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      alert('✅ Admin account created successfully! Now you can login.');
      // Clear form
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
    } else {
      const error = await response.text();
      console.error('Error:', error);
      alert('❌ Error creating account. Check console for details.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Network error: ' + error.message);
  }
}
  */



const SUPABASE_URL = 'https://duhauvyhekixzaxvbgze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aGF1dnloZWtpeHpheHZiZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg2NjksImV4cCI6MjA4NDQ3NDY2OX0.ytteNJ0FFjA_2pl-1bguTBASJVtkyRa8zPQdLb4eX38';

async function checkLogin() {
    const token = sessionStorage.getItem('sb_access_token');

    if (!token) {
        window.location.href = 'admin-login.html';
        return false;
    }

    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            sessionStorage.clear();
            window.location.href = 'admin-login.html';
            return false;
        }

        return true;

    } catch (err) {
        sessionStorage.clear();
        window.location.href = 'admin-login.html';
        return false;
    }
}

function getAuthHeaders() {
    const token = sessionStorage.getItem('sb_access_token');
    return {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

function logout() {
    if (confirm('Chiqishni xohlaysizmi?')) {
        sessionStorage.clear();
        window.location.href = 'admin-login.html';
    }
}