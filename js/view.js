function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (translations[key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[key][currentLang];
            }
            else if (element.closest('.skill-content, .ftext')) {
                element.innerHTML = translations[key][currentLang];
            }
            else {
                element.textContent = translations[key][currentLang];
            }
        }
    });

    document.querySelectorAll('.skill-content').forEach(content => {
        const key = content.dataset.i18n;
        content.innerHTML = translations[key][currentLang];
    });
}
