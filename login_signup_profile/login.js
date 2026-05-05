

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('loginEmail');
const passwordInput = document.getElementById('loginPass');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');
const successMsg = document.getElementById('successMsg');


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateLoginForm() {
    let isValid = true;
    
    
    emailError.style.display = 'none';
    passError.style.display = 'none';
    
    
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required!';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email!';
        emailError.style.display = 'block';
        isValid = false;
    }
    
    
    if (!passwordInput.value.trim()) {
        passError.textContent = 'Password is required!';
        passError.style.display = 'block';
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        passError.textContent = 'Password must be at least 6 characters!';
        passError.style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}


function checkUserExists(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email && user.password === password);
}


loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    successMsg.style.display = 'none';
    successMsg.textContent = '';
    
    
    if (!validateLoginForm()) {
        return;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    
    const user = checkUserExists(email, password);
    
    if (user) {
        
        sessionStorage.setItem('loggedInUser', JSON.stringify({
            name: user.name,
            email: user.email
        }));
        
        
        successMsg.textContent = 'Login successful! Redirecting...';
        successMsg.style.display = 'block';
        
        
        loginForm.reset();
        
        
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1500);
    } else {
        
        passError.textContent = 'Invalid email or password!';
        passError.style.display = 'block';
    }
});


window.addEventListener('DOMContentLoaded', function() {
    const savedEmail = localStorage.getItem('lastLoginEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
    }
});


emailInput.addEventListener('blur', function() {
    if (validateEmail(this.value)) {
        localStorage.setItem('lastLoginEmail', this.value);
    }
});
