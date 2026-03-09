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

    for (const block of article.blocks) {
        if (block.type === "paragraph") {
            html += `<div class="article-body">${block.text}</div>`;
        }
        if (block.type === "image") {
            html += `<img class="article-image" src="${block.src}" alt="">`;
        }
        if (block.type === "caption") {
            html += `<div class="article-caption">${block.text}</div>`;
        }
    }

    container.innerHTML = html;
}

loadArticlePage();
