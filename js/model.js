document.addEventListener('DOMContentLoaded', () => {
    currentLang = localStorage.getItem('siteLanguage') || 'en';
    translatePage();
    
    document.querySelectorAll('.skill-content').forEach(content => {
        const key = content.dataset.i18n;
        content.dataset.originalPt = translations[key].pt;
        content.dataset.originalEn = translations[key].en;
    });

    // Adicionar evento global para delegar o hover
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('highlight-text')) {
            document.querySelector('.search-bar').value = '';
            searchText();
        }
    });
});
