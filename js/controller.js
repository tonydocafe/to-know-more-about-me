function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'pt' : 'en';
    translatePage();
    localStorage.setItem('siteLanguage', currentLang);
}


