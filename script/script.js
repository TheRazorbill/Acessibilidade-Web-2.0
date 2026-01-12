"use strict";
// script.js
document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menu-toggle');
    var mainMenu = document.getElementById('main-menu');
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function () {
            var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
            mainMenu.classList.toggle('hidden');
            mainMenu.classList.toggle('flex');
            mainMenu.classList.toggle('flex-col');
            if (!isExpanded) {
                var firstLink = mainMenu.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        });
        mainMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (!mainMenu.classList.contains('hidden')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    mainMenu.classList.add('hidden');
                    mainMenu.classList.remove('flex', 'flex-col');
                }
            });
        });
        document.addEventListener('click', function (event) {
            var isClickInsideMenu = mainMenu.contains(event.target);
            var isClickOnToggle = menuToggle.contains(event.target);
            if (!mainMenu.classList.contains('hidden') && !isClickInsideMenu && !isClickOnToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainMenu.classList.add('hidden');
                mainMenu.classList.remove('flex', 'flex-col');
            }
        });
    }
    else {
        console.error("Menu toggle button or main menu not found. Check your HTML IDs.");
    }
    var scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove('hidden');
                scrollToTopBtn.classList.add('block');
            }
            else {
                scrollToTopBtn.classList.remove('block');
                scrollToTopBtn.classList.add('hidden');
            }
        });
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
