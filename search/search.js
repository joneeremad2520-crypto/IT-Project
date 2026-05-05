


const searchForm = document.querySelector('form');
const searchInput = document.getElementById('lang-search');
const searchBtn = document.getElementById('searchBtn');


const validLanguages = ['C#', 'C++', 'Python', 'Java', 'JavaScript', 'PHP'];


function validateSearch(language) {
    return language.trim().length > 0 && validLanguages.includes(language);
}


if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchTerm = searchInput.value.trim();
        
        
        if (!searchTerm) {
            alert('Please enter a programming language!');
            return;
        }
        
        if (!validateSearch(searchTerm)) {
            alert('Please select a valid programming language from the list:\n' + validLanguages.join(', '));
            return;
        }
        
        
        const searchRecord = {
            language: searchTerm,
            searchedAt: new Date().toLocaleString(),
            sessionId: sessionStorage.getItem('sessionId') || generateSessionId()
        };
        
        
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory.push(searchRecord);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        
        
        const sessionSearches = JSON.parse(sessionStorage.getItem('sessionSearches')) || [];
        sessionSearches.push(searchRecord);
        sessionStorage.setItem('sessionSearches', JSON.stringify(sessionSearches));
        
        
        showSearchSuccess(searchTerm);
        
        
        searchForm.reset();
    });
}


function showSearchSuccess(language) {
    
    let successMsg = document.getElementById('searchSuccessMsg');
    
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.id = 'searchSuccessMsg';
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4BB543;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 9999;
            animation: slideIn 0.3s ease-in-out;
        `;
        document.body.appendChild(successMsg);
    }
    
    successMsg.textContent = `Searching for: ${language}`;
    successMsg.style.display = 'block';
    
    
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 2000);
}


function generateSessionId() {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('sessionId', sessionId);
    return sessionId;
}


window.addEventListener('DOMContentLoaded', function() {
    if (!sessionStorage.getItem('sessionId')) {
        generateSessionId();
    }
    
    
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    console.log('Total searches in history:', searchHistory.length);
    
    if (searchHistory.length > 0) {
        console.log('Last 3 searches:', searchHistory.slice(-3));
    }
});


if (searchInput) {
    searchInput.addEventListener('change', function() {
        const value = this.value.trim();
        if (value && !validLanguages.includes(value)) {
            this.style.borderColor = '#ff6b6b';
            this.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
        } else {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
        }
    });
}
