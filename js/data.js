async function loadCSVList() {
    const response = await fetch("csv/index.json");
    return await response.json();
}

async function loadCSV(path) {
    const response = await fetch(path);
    const text = await response.text();
    const lines = text.trim().split("\n");

    const type = lines[0].trim();
    const image = lines[1].trim();
    const [author, date, time] = lines[2].split(";").map(x => x.trim());

    const contentLines = lines.slice(3);

    let title = "";
    let subtitle = "";
    const blocks = [];
    let currentCarousel = null;

    for (let line of contentLines) {
        line = line.trim();

        if (line.startsWith("#Title;")) {
            title = line.replace("#Title;", "").trim();
        }
        else if (line.startsWith("#Subtitle;")) {
            subtitle = line.replace("#Subtitle;", "").trim();
        }
        else if (line.startsWith("#BodyText;")) {
            currentCarousel = null;
            blocks.push({ type: "paragraph", text: line.replace("#BodyText;", "").trim() });
        }
        else if (line.startsWith("#Image;")) {
            currentCarousel = null;
            blocks.push({ type: "image", src: line.replace("#Image;", "").trim() });
        }
        else if (line.startsWith("#Caption;")) {
            currentCarousel = null;
            blocks.push({ type: "caption", text: line.replace("#Caption;", "").trim() });
        }
        else if (line === "#Carousel") {
            currentCarousel = [];
            blocks.push({ type: "carousel", slides: currentCarousel });
        }
        else if (line.startsWith("#Element;") && currentCarousel !== null) {
            const parts = line.replace("#Element;", "").split(";");
            currentCarousel.push({
                src: parts[0]?.trim() || "",
                caption: parts[1]?.trim() || ""
            });
        }
    }

    return { type, image, author, date, time, title, subtitle, blocks };
}