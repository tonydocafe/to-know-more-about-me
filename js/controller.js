function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'pt' : 'en';
    translatePage();
    localStorage.setItem('siteLanguage', currentLang);
}



function searchText() {
    const input = document.querySelector('.search-bar').value.toLowerCase();
    const skills = document.querySelectorAll('.skill');
    const counter = document.getElementById('searchCounter');

    currentMatchIndex = -1;
    allMatches = [];
    
    skills.forEach(skill => highlightMatches(skill, input));

    totalMatches = allMatches.length;
    
    if(totalMatches > 0) {
        currentMatchIndex = 0;
        highlightCurrentMatch();
        counter.style.display = 'block';
        updateCounter();
    } else {
        counter.style.display = 'none';
    }
}
