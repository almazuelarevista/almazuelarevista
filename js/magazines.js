async function renderMagazines() {
    const container = document.getElementById("magazine-container");
    container.innerHTML = "";

    const magazines = await loadMagazines();

    for (const mag of magazines) {
        const html = `
            <div class="magazine-item">
                <div class="magazine-number">NÚMERO ${mag.number}</div>
                <div class="magazine-name">${mag.name}</div>

                <a href="${mag.link}" target="_blank">
                    <img class="magazine-image" src="${mag.image}" alt="${mag.name}">
                </a>
            </div>
        `;
        container.innerHTML += html;
    }
}

renderMagazines();

