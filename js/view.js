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


function highlightMatches(skill, input) {
    const contentElement = skill.querySelector('.skill-content');
    const key = contentElement.dataset.i18n;

    const langContent = currentLang === 'pt' 
        ? translations[key].pt 
        : translations[key].en;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = langContent;
    
    const visibleText = tempDiv.textContent.toLowerCase();
    const inputText = input.toLowerCase();

    skill.classList.remove('highlighted');

    if (!input) {
        contentElement.innerHTML = langContent;
        skill.style.cssText = '';
        return;
    }
    
    if (visibleText.includes(inputText)) {
       
        const parser = new DOMParser();
        const doc = parser.parseFromString(langContent, 'text/html');
                
        const markTextNodes = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const newText = node.textContent.replace(
                    new RegExp(input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
                    match => `<mark class="highlight-text">${match}</mark>`
                );
                const wrapper = document.createElement('span');
                wrapper.innerHTML = newText;
                node.replaceWith(wrapper);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                Array.from(node.childNodes).forEach(markTextNodes);
            }
        };

        markTextNodes(doc.body);
               
        contentElement.innerHTML = doc.body.innerHTML;
        skill.classList.add('highlighted');
        allMatches.push(skill);

        contentElement.querySelectorAll('.highlight-text').forEach(mark => {
            mark.addEventListener('mouseover', () => {
                document.querySelector('.search-bar').value = '';
                searchText();
            });
        });
    } else {
        contentElement.innerHTML = langContent; 
    }
}

