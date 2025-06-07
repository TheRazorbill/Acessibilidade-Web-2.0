// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Select the menu toggle button and the main navigation menu
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    // Check if both elements exist before adding event listeners
    if (menuToggle && mainMenu) {
        /**
         * Toggles the visibility of the mobile navigation menu.
         * Also toggles the 'aria-expanded' attribute for accessibility.
         */
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainMenu.classList.toggle('hidden'); // Toggle Tailwind's hidden class
            mainMenu.classList.toggle('flex');   // Ensure it's flex when visible
            mainMenu.classList.toggle('flex-col'); // Stack items vertically in mobile view

            // Add/remove a transition class for smoother animation if desired
            // mainMenu.classList.toggle('transition-all', !isExpanded);
            // mainMenu.classList.toggle('duration-300', !isExpanded);

            // If the menu is now open, focus the first link inside it for keyboard users
            if (!isExpanded) {
                const firstLink = mainMenu.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        });

        /**
         * Closes the mobile menu when a navigation link is clicked.
         * This is useful for single-page applications where links scroll to sections.
         */
        mainMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Only close if the menu is currently visible (i.e., not hidden)
                if (!mainMenu.classList.contains('hidden')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    mainMenu.classList.add('hidden');
                    mainMenu.classList.remove('flex', 'flex-col'); // Remove flex classes
                }
            });
        });

        /**
         * Closes the mobile menu if the user clicks outside of it.
         * This improves the user experience on touch devices.
         */
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mainMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            // If the menu is open and the click is outside both the menu and the toggle button
            if (!mainMenu.classList.contains('hidden') && !isClickInsideMenu && !isClickOnToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainMenu.classList.add('hidden');
                mainMenu.classList.remove('flex', 'flex-col');
            }
        });
    } else {
        console.error("Menu toggle button or main menu not found. Check your HTML IDs.");
    }


    // Optional: Add a "Scroll to Top" button functionality
    // (You would need to add a button with id="scroll-to-top" in your HTML)
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        /**
         * Shows or hides the scroll-to-top button based on scroll position.
         */
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling down 300px
                scrollToTopBtn.classList.remove('hidden');
                scrollToTopBtn.classList.add('block');
            } else {
                scrollToTopBtn.classList.remove('block');
                scrollToTopBtn.classList.add('hidden');
            }
        });

        /**
         * Scrolls the page smoothly back to the top when the button is clicked.
         */
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll animation
            });
        });
    }
});
