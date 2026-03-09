let currentFilter = "todos";

document.querySelectorAll(".selector-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".selector-btn.active")?.classList.remove("active");
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;
        renderArticles();
    });
});

async function renderArticles() {
    const container = document.getElementById("articles-container");
    container.innerHTML = "";

    const csvList = await loadCSVList();

    for (const fileName of csvList) {
        const article = await loadCSV("csv/" + fileName);

        if (currentFilter !== "todos" && article.type !== currentFilter) {
            continue;
        }

        const html = `
            <div class="articles" onclick="openArticle('${fileName}')">
                <img src="${article.image}" alt="${article.title}">
                <div class="meta">${article.author} · ${article.time} · ${article.date}</div>
                <div class="titulo">${article.title}</div>
            </div>
        `;

        container.innerHTML += html;
    }
}

function openArticle(fileName) {
    window.location.href = `article.html?id=${fileName}`;
}

renderArticles();
