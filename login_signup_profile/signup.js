
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('fName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pass');
const nameError = document.getElementById('fNameError');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');
const successMsg = document.getElementById('successMsg');


function validateName(name) {
    return name.trim().length >= 3;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function checkEmailExists(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}

function validateSignupForm() {
    let isValid = true;
    
    
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    passError.style.display = 'none';
    
    
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required!';
        nameError.style.display = 'block';
        isValid = false;
    } else if (!validateName(nameInput.value)) {
        nameError.textContent = 'Name must be at least 3 letters!';
        nameError.style.display = 'block';
        isValid = false;
    }
    
    
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required!';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email!';
        emailError.style.display = 'block';
        isValid = false;
    } else if (checkEmailExists(emailInput.value)) {
        emailError.textContent = 'This email is already registered!';
        emailError.style.display = 'block';
        isValid = false;
    }
    
    
    if (!passwordInput.value.trim()) {
        passError.textContent = 'Password is required!';
        passError.style.display = 'block';
        isValid = false;
    } else if (!validatePassword(passwordInput.value)) {
        passError.textContent = 'Password must be 6+ characters!';
        passError.style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}


signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    successMsg.style.display = 'none';
    successMsg.textContent = '';
    
    
    if (!validateSignupForm()) {
        return;
    }
    
    
    const newUser = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
        registeredAt: new Date().toLocaleString()
    };
    
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
   
    users.push(newUser);
    
    
    localStorage.setItem('users', JSON.stringify(users));
    
    
    successMsg.textContent = 'Account created successfully! Redirecting to login...';
    successMsg.style.display = 'block';
    
    
    signupForm.reset();
    
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
});


nameInput.addEventListener('blur', function() {
    if (this.value.trim()) {
        if (validateName(this.value)) {
            nameError.style.display = 'none';
        }
    }
});

emailInput.addEventListener('blur', function() {
    if (this.value.trim()) {
        if (validateEmail(this.value) && !checkEmailExists(this.value)) {
            emailError.style.display = 'none';
        }
    }
});

passwordInput.addEventListener('blur', function() {
    if (this.value.trim()) {
        if (validatePassword(this.value)) {
            passError.style.display = 'none';
        }
    }
});
