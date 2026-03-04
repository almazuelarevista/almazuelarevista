function resizeHeaderOnScroll() {
  const distanceY = window.pageYOffset || document.documentElement.scrollTop,
  shrinkOn = 200,
  headerEl = document.getElementById('js-header');
  
  if (distanceY > shrinkOn) {
    headerEl.classList.add("smaller");
  } else {
    headerEl.classList.remove("smaller");
  }
}

window.addEventListener('scroll', resizeHeaderOnScroll);

async function loadCSVList() {
    const response = await fetch("csv/_index.json");
    return await response.json(); 
}

async function loadCSV(path) {
    const response = await fetch(path);
    const text = await response.text();
    const lines = text.trim().split("\n");

    const image = lines[0].trim();
    const [author, date, time] = lines[1].split(";").map(x => x.trim());
    const title = lines[2].trim();

    return { image, author, date, time, title };
}

async function renderArticles() {
    const container = document.getElementById("articles-container");
    container.innerHTML = "";

    const csvList = await loadCSVList();

    for (const fileName of csvList) {
        const article = await loadCSV("csv/" + fileName);

        const html = `
            <div class="articles">
                <img src="${article.image}" alt="${article.title}">
                <div class="meta">${article.author} · ${article.time} · ${article.date}</div>
                <div class="titulo">${article.title}</div>
            </div>
        `;

        container.innerHTML += html;
    }
}

renderArticles();

