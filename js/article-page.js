async function loadArticlePage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const article = await loadCSV("csv/" + id);
    const container = document.getElementById("article-content");

    let html = `
        <div class="article-title">${article.title}</div>
        <div class="article-meta">${article.author} · ${article.time} · ${article.date}</div>
        <div class="article-subtitle">${article.subtitle}</div>
    `;

    let carouselCount = 0;

    for (const block of article.blocks) {
        if (block.type === "paragraph") {
            html += `<div class="article-body">${block.text}</div>`;
        }
        else if (block.type === "image") {
            html += `<img class="article-image" src="${block.src}" alt="">`;
        }
        else if (block.type === "caption") {
            html += `<div class="article-caption">${block.text}</div>`;
        }
        else if (block.type === "carousel") {
            const carouselId = `article-carousel-${carouselCount++}`;
            html += buildCarouselHtml(carouselId, block.slides);
        }
    }

    container.innerHTML = html;
}

function buildCarouselHtml(carouselId, slides) {
    if (!slides || slides.length === 0) return "";

    const slidesHtml = slides.map((el, i) => `
        <div class="carousel-slide ${i === 0 ? "active" : ""}">
            <img src="${el.src}" alt="${el.caption}">
            ${el.caption ? `<div class="carousel-caption">${el.caption}</div>` : ""}
        </div>
    `).join("");

    const controlsHtml = slides.length > 1 ? `
        <button class="carousel-btn carousel-prev" onclick="carouselMove('${carouselId}', -1)">&#8249;</button>
        <button class="carousel-btn carousel-next" onclick="carouselMove('${carouselId}', 1)">&#8250;</button>
        <div class="carousel-dots">
            ${slides.map((_, i) => `
                <span class="carousel-dot ${i === 0 ? "active" : ""}" onclick="carouselGoTo('${carouselId}', ${i})"></span>
            `).join("")}
        </div>
    ` : "";

    return `
        <div class="carousel article-carousel" id="${carouselId}" data-index="0">
            <div class="carousel-track">${slidesHtml}</div>
            ${controlsHtml}
        </div>
    `;
}

function carouselMove(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll(".carousel-slide");
    let index = parseInt(carousel.dataset.index);
    index = (index + direction + slides.length) % slides.length;
    carouselGoTo(carouselId, index);
}

function carouselGoTo(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll(".carousel-slide");
    const dots = carousel.querySelectorAll(".carousel-dot");

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index]?.classList.add("active");
    carousel.dataset.index = index;
}

loadArticlePage();