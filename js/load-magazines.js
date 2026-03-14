async function loadMagazines() {
    const response = await fetch("csv/_magazines.csv");
    const text = await response.text();
    const lines = text.trim().split("\n");

    const magazines = [];
    let current = {};

    for (let line of lines) {
        line = line.trim();

        if (line.startsWith("#Number;")) {
            if (Object.keys(current).length > 0) magazines.push(current);
            current = {};
            current.number = line.replace("#Number;", "").trim();
        }
        else if (line.startsWith("#Name;")) {
            current.name = line.replace("#Name;", "").trim();
        }
        else if (line.startsWith("#Image;")) {
            current.image = line.replace("#Image;", "").trim();
        }
        else if (line.startsWith("#Link;")) {
            current.link = line.replace("#Link;", "").trim();
        }
    }

    if (Object.keys(current).length > 0) magazines.push(current);

    return magazines;
}
