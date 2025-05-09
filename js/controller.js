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

function nextMatch() {
    if (totalMatches === 0) return;
    currentMatchIndex = (currentMatchIndex + 1) % totalMatches;
    highlightCurrentMatch();
    updateCounter();
}

function previousMatch() {
    if (totalMatches === 0) return;
    currentMatchIndex = (currentMatchIndex - 1 + totalMatches) % totalMatches;
    highlightCurrentMatch();
    updateCounter();
}


let isScrolling = false;
let currentIndex = 0;
const pages = document.querySelectorAll(".page");
function scrollToPage(index) {
    if (index >= 0 && index < pages.length) {
        currentIndex = index;
        window.scrollTo({
            top: pages[index].offsetTop,
            behavior: "smooth"
        });
        isScrolling = true;
        setTimeout(() => isScrolling = false, 500);
    }
}


document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchText();
    }
});

document.addEventListener('keydown', (e) => {
    if (allMatches.length === 0) return;
    if (e.key === 'ArrowLeft') {
        previousMatch();
    } 
    else if (e.key === 'ArrowRight') {
        nextMatch();
    }
});


let resizeTimeout;
window.addEventListener('resize', () => {
    isScrolling = false;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        currentIndex = 0;
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100); 
});



window.addEventListener("wheel", (event) => {
    const expandedSkills = document.querySelectorAll('.skill.highlighted, .skill:hover');
    let isMouseInsideSkill = false;

    expandedSkills.forEach(skill => {
        // Verificar se o mouse está realmente dentro da skill e se ela está expandida
        const style = getComputedStyle(skill);
        const isExpanded = parseFloat(style.width) > 160; // Largura original é 150px

        if (isExpanded && skill.matches(':hover')) {
            isMouseInsideSkill = true;
            const skillContent = skill.querySelector('.skill-content');
            const delta = event.deltaY;

            // Se o conteúdo da skill for rolável, bloquear o scroll da página
            if (skillContent.scrollHeight > skillContent.clientHeight) {
                event.preventDefault();
                event.stopPropagation();
                skillContent.scrollTop += delta * 0.5;
            }
        }
    });

    // Scroll normal apenas se não estiver em uma skill expandida
    if (!isMouseInsideSkill) {
        if (event.deltaY > 0 && currentIndex < pages.length - 1) {
            scrollToPage(currentIndex + 1);
        } else if (event.deltaY < 0 && currentIndex > 0) {
            scrollToPage(currentIndex - 1);
        }
    }
},);


