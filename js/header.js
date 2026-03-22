function resizeHeaderOnScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    const shrinkOn = 200;
    const headerEl = document.getElementById('js-header');

    if (distanceY > shrinkOn) {
        headerEl.classList.add("smaller");
    } else {
        headerEl.classList.remove("smaller");
    }
}

window.addEventListener('scroll', resizeHeaderOnScroll);

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("mobileMenu");
    const header = document.getElementById("js-header");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("open");
            header.classList.toggle("menu-open", isOpen);
        });
    }
});
