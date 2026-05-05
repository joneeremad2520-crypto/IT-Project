document.addEventListener('DOMContentLoaded', () => {
    
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    const form = document.getElementById('feedbackForm');
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const submitBtn = document.getElementById('submitBtn');
    const flipCard = document.getElementById('flipCard');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateName() {
        const nameValue = nameInput.value.trim();
        if (nameValue.length === 0) {
            nameInput.classList.remove('input-valid', 'input-invalid');
            nameError.style.display = 'none';
            return false;
        } else if (nameValue.length < 3) {
            nameInput.classList.remove('input-valid');
            nameInput.classList.add('input-invalid');
            nameError.style.display = 'block'; 
            return false;
        } else {
            nameInput.classList.remove('input-invalid');
            nameInput.classList.add('input-valid');
            nameError.style.display = 'none'; 
            return true;
        }
    }

    function validateEmail() {
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.remove('input-valid');
            emailInput.classList.add('input-invalid');
            emailError.style.display = 'block';
            return false;
        } else {
            emailInput.classList.remove('input-invalid');
            emailInput.classList.add('input-valid');
            emailError.style.display = 'none';
            return true;
        }
    }

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const isNameValid = validateName();
        const isEmailValid = validateEmail();

        if (!isNameValid || !isEmailValid) {
            return; 
        }

        const originalBtnText = submitBtn.textContent;
        submitBtn.innerHTML = 'Sending... ⏳';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            flipCard.classList.add('is-flipped');
            setTimeout(() => {
                form.reset();
                nameInput.classList.remove('input-valid');
                emailInput.classList.remove('input-valid');
            }, 500);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    });

    document.getElementById('resetCardBtn').addEventListener('click', () => {
        flipCard.classList.remove('is-flipped');
    });

    document.getElementById('closeBtn').addEventListener('click', () => {
        const container = document.getElementById('mainContainer');
        container.style.transition = 'all 0.4s ease';
        container.style.opacity = '0';
        container.style.transform = 'scale(0.9)';
        setTimeout(() => { container.style.display = 'none'; }, 400);
    });
});