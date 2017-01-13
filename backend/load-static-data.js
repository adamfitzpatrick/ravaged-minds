"use strict";

const fs = require("fs");
const path = require("path");
const yaml = require("yamljs");

const getDataDirectory = (directory) => {
    return fs.readdirSync(path.join(__dirname, directory))
        .filter(file => /ya*ml$/.test(file))
        .map(file => {
            const yamlStr =fs.readFileSync(path.join(__dirname, directory, file), "utf-8");
            return yaml.parse(yamlStr);
        });
};
const stories = getDataDirectory("../story-assets/static-data/stories");
const maps = getDataDirectory("../story-assets/static-data/maps");
const entities = getDataDirectory("../story-assets/static-data/entities");
const synopses = getDataDirectory("../story-assets/static-data/synopses");

module.exports = {
    stories: stories,
    maps: maps,
    entities: entities,
    synopses: synopses
};
