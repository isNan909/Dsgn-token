const generateBtn = document.getElementById("generateMe");
const loader = document.querySelector(".loaderWrapper");

function getFontStyles(stylesArtboard) {
    const fontStyles = {};
    const fontStylesArtboard = stylesArtboard.filter(item => {
        return item.name === "type";
    })[0].children;

    fontStylesArtboard.map((fontItem, i) => {
        if (fontItem.children) {
            let subFonts = {};

            fontItem.children.map(subFontItem => {
                let subFontObj = {
                    [subFontItem.name]: {
                        family: {
                            value: `${subFontItem.style.fontFamily}`,
                            type: "type"
                        },
                        size: {
                            value: `${subFontItem.style.fontSize}px`,
                            type: "type"
                        },
                        weight: {
                            value: subFontItem.style.fontWeight,
                            type: "type"
                        },
                        lineheight: {
                            value: `${subFontItem.style.lineHeightPercent}%`,
                            type: "type"
                        },
                        spacing: {
                            value: subFontItem.style.letterSpacing !== 0 ?
                                `${subFontItem.style.letterSpacing}px` : "normal",
                            type: "type"
                        }
                    }
                };
                Object.assign(subFonts, subFontObj);
            });

            let fontObj = {
                [fontItem.name]: subFonts
            };

            Object.assign(fontStyles, fontObj);
        } else {
            let fontObj = {
                [fontItem.name]: {
                    family: {
                        value: `${fontItem.style.fontFamily}, ${
                            fontItem.style.fontPostScriptName
                        }`,
                        type: "type"
                    },
                    size: {
                        value: fontItem.style.fontSize,
                        type: "type"
                    },
                    weight: {
                        value: fontItem.style.fontWeight,
                        type: "type"
                    },
                    lineheight: {
                        value: `${fontItem.style.lineHeightPercent}%`,
                        type: "type"
                    },
                    spacing: {
                        value: fontItem.style.letterSpacing !== 0 ?
                            `${fontItem.style.letterSpacing}px` : "normal",
                        type: "type"
                    }
                }
            };

            Object.assign(fontStyles, fontObj);
            loader.classList.add("loaderWrapper");
        }
    });

    return fontStyles;
}


async function getStylesArtboard(figmaApiKey, figmaId) {
    const result = await fetch("https://api.figma.com/v1/files/" + figmaId, {
        method: "GET",
        headers: {
            "X-Figma-Token": figmaApiKey
        }
    });
    const figmaTreeStructure = await result.json();

    const stylesArtboard = figmaTreeStructure.document.children.filter(item => {
        return item.name === "styles";
    })[0].children;

    baseTokeensJSON = {
        token: {
            fonts: {}
        }
    };

    Object.assign(baseTokeensJSON.token.fonts, getFontStyles(stylesArtboard));

    loader.classList.add("hide");

    download(
        JSON.stringify(baseTokeensJSON, null, 4),
        "base.json",
        "application/json"
    );
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {
        type: contentType
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

generateBtn.onclick = function () {
    loader.classList.remove("hide");
    getStylesArtboard(
        "36208-ac2faf1c-3829-4679-8e29-cd81dcde443b",
        "JfZz46bVQzUA2TTtoSnhnG"
    );
}