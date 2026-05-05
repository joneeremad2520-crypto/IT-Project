


const pName = document.getElementById('pName');
const pEmail = document.getElementById('pEmail');
const pPassword = document.getElementById('pPassword');
const pAvatar = document.getElementById('pAvatar');
const toggleIcon = document.getElementById('toggleIcon');

let passwordVisible = false;


function loadUserProfile() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
        
        window.location.href = 'login.html';
        return;
    }
    
    const user = JSON.parse(loggedInUser);
    
    
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const fullUserData = allUsers.find(u => u.email === user.email);
    
    if (fullUserData) {
        
        pName.textContent = fullUserData.name;
        pEmail.textContent = fullUserData.email;
        pPassword.textContent = fullUserData.password;
        
        
        const firstLetter = fullUserData.name.charAt(0).toUpperCase();
        pAvatar.textContent = firstLetter;
    } else {
        
        pName.textContent = user.name;
        pEmail.textContent = user.email;
        pAvatar.textContent = user.name.charAt(0).toUpperCase();
    }
}


if (toggleIcon) {
    toggleIcon.addEventListener('click', function() {
        if (passwordVisible) {
            pPassword.textContent = pPassword.dataset.password || '******';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
            passwordVisible = false;
        } else {
            
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
            const allUsers = JSON.parse(localStorage.getItem('users')) || [];
            const fullUserData = allUsers.find(u => u.email === loggedInUser.email);
            
            if (fullUserData) {
                pPassword.textContent = fullUserData.password;
                pPassword.dataset.password = fullUserData.password;
            }
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
            passwordVisible = true;
        }
    });
}


function logout() {
    
    if (confirm('Are you sure you want to log out?')) {
        
        sessionStorage.removeItem('loggedInUser');
        
        
        window.location.href = 'login.html';
    }
}


window.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
});
