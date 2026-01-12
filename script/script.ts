document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById(
    "menu-toggle"
  ) as HTMLButtonElement | null;
  const mainMenu = document.getElementById("main-menu") as HTMLElement | null;

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener("click", () => {
      const isExpanded: boolean =
        menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", (!isExpanded).toString());

      mainMenu.classList.toggle("hidden");
      mainMenu.classList.toggle("flex");
      mainMenu.classList.toggle("flex-col");

      if (!isExpanded) {
        const firstLink = mainMenu.querySelector(
          "a"
        ) as HTMLAnchorElement | null;
        firstLink?.focus();
      }
    });

    const menuLinks = mainMenu.querySelectorAll<HTMLAnchorElement>("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!mainMenu.classList.contains("hidden")) {
          menuToggle.setAttribute("aria-expanded", "false");
          mainMenu.classList.add("hidden");
          mainMenu.classList.remove("flex", "flex-col");
        }
      });
    });

    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInsideMenu = mainMenu.contains(target);
      const isClickOnToggle = menuToggle.contains(target);

      if (
        !mainMenu.classList.contains("hidden") &&
        !isClickInsideMenu &&
        !isClickOnToggle
      ) {
        menuToggle.setAttribute("aria-expanded", "false");
        mainMenu.classList.add("hidden");
        mainMenu.classList.remove("flex", "flex-col");
      }
    });
  } else {
    console.error("Menu toggle button or main menu not found.");
  }

  const scrollToTopBtn = document.getElementById(
    "scroll-to-top"
  ) as HTMLButtonElement | null;

  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.replace("hidden", "block");
      } else {
        scrollToTopBtn.classList.replace("block", "hidden");
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});