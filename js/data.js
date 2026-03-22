async function loadCSVList() {
    let jsonPath;

    if (location.protocol === "file:" || location.hostname === "localhost") {
        jsonPath = "../csv/index.json";
    } else {
        jsonPath = "csv/index.json";
    }

const response = await fetch(jsonPath);

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

    for (let line of contentLines) {
        line = line.trim();

        if (line.startsWith("#Title;")) {
            title = line.replace("#Title;", "").trim();
        }
        else if (line.startsWith("#Subtitle;")) {
            subtitle = line.replace("#Subtitle;", "").trim();
        }
        else if (line.startsWith("#BodyText;")) {
            blocks.push({
                type: "paragraph",
                text: line.replace("#BodyText;", "").trim()
            });
        }
        else if (line.startsWith("#Image;")) {
            blocks.push({
                type: "image",
                src: line.replace("#Image;", "").trim()
            });
        }
        else if (line.startsWith("#Caption;")) {
            blocks.push({
                type: "caption",
                text: line.replace("#Caption;", "").trim()
            });
        }
    }

    return { type, image, author, date, time, title, subtitle, blocks };
}


