


const feedbackForm = document.getElementById('feedbackForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const ratingSelect = document.getElementById('rating');
const commentsInput = document.getElementById('comments');
const formHeader = document.getElementById('formHeader');
const thankYouMsg = document.getElementById('thankYouMsg');


function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateComments(comments) {
    return comments.trim().length >= 5;
}

function validateFeedbackForm() {
   
    clearErrors();
    let isValid = true;
    
    
    if (!fullNameInput.value.trim()) {
        showError(fullNameInput, 'Full name is required!');
        isValid = false;
    } else if (!validateName(fullNameInput.value)) {
        showError(fullNameInput, 'Full name must be at least 2 characters!');
        isValid = false;
    }
    
    
    if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required!');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email!');
        isValid = false;
    }
    
   
    if (!commentsInput.value.trim()) {
        showError(commentsInput, 'Comments are required!');
        isValid = false;
    } else if (!validateComments(commentsInput.value)) {
        showError(commentsInput, 'Comments must be at least 5 characters!');
        isValid = false;
    }
    
    return isValid;
}

function showError(element, message) {
    element.style.borderColor = '#ff6b6b';
    element.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
    
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-msg';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    
    const errorMsgs = document.querySelectorAll('.error-msg');
    errorMsgs.forEach(msg => {
        if (msg.parentNode) {
            msg.parentNode.removeChild(msg);
        }
    });
    
    
    fullNameInput.style.borderColor = '';
    fullNameInput.style.backgroundColor = '';
    emailInput.style.borderColor = '';
    emailInput.style.backgroundColor = '';
    commentsInput.style.borderColor = '';
    commentsInput.style.backgroundColor = '';
}

feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    if (!validateFeedbackForm()) {
        return;
    }
    
    
    const feedback = {
        fullName: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        rating: ratingSelect.value,
        comments: commentsInput.value.trim(),
        submittedAt: new Date().toLocaleString()
    };
    
    
    const allFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    
    
    allFeedbacks.push(feedback);
    
    
    localStorage.setItem('feedbacks', JSON.stringify(allFeedbacks));
    
    
    sessionStorage.setItem('lastFeedback', JSON.stringify(feedback));
    
    
    formHeader.classList.add('hidden');
    feedbackForm.classList.add('hidden');
    feedbackForm.style.display = 'none';
    formHeader.style.display = 'none';
    
    thankYouMsg.classList.remove('hidden');
    thankYouMsg.style.display = 'block';
    
    
    feedbackForm.reset();
    clearErrors();
    
    
    setTimeout(() => {
        location.reload();
    }, 3000);
});


fullNameInput.addEventListener('blur', function() {
    if (this.value.trim()) {
        if (validateName(this.value)) {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
        }
    }
});

emailInput.addEventListener('blur', function() {
    if (this.value.trim()) {
        if (validateEmail(this.value)) {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
        }
    }
});

commentsInput.addEventListener('blur', function() {
    if (this.value.trim()) {
        if (validateComments(this.value)) {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
        }
    }
});


window.addEventListener('DOMContentLoaded', function() {
    const lastFeedback = sessionStorage.getItem('lastFeedback');
    if (lastFeedback) {
        const feedback = JSON.parse(lastFeedback);
        console.log('Last feedback submitted:', feedback);
    }
});
