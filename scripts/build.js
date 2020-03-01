const StyleDictionary = require("style-dictionary").extend({
    source: ["src/**/*.json"],
    platforms: {
        sass: {
            transformGroup: "scss",
            buildPath: "stylesheets/",
            files: [{
                destination: "_typography.sass",
                format: "scss/variables",
                filter: {
                    type: "type"
                }
            }]
        }
    }
});

StyleDictionary.buildAllPlatforms();