const LanguageModel = {
    getCurrentLanguage() {
        return localStorage.getItem('siteLanguage') || 'en';
    }
};

