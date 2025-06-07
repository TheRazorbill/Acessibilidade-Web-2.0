// script.js

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    if (menuToggle && mainMenu) {

        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainMenu.classList.toggle('hidden');
            mainMenu.classList.toggle('flex');
            mainMenu.classList.toggle('flex-col');

            if (!isExpanded) {
                const firstLink = mainMenu.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        });

        mainMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (!mainMenu.classList.contains('hidden')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    mainMenu.classList.add('hidden');
                    mainMenu.classList.remove('flex', 'flex-col');
                }
            });
        });

        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mainMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!mainMenu.classList.contains('hidden') && !isClickInsideMenu && !isClickOnToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainMenu.classList.add('hidden');
                mainMenu.classList.remove('flex', 'flex-col');
            }
        });
    } else {
        console.error("Menu toggle button or main menu not found. Check your HTML IDs.");
    }


    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove('hidden');
                scrollToTopBtn.classList.add('block');
            } else {
                scrollToTopBtn.classList.remove('block');
                scrollToTopBtn.classList.add('hidden');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
