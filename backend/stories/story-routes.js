"use strict";

const router = require("json-server").create();
const fs = require("fs");
const path = require("path");
const storyJsonPath = path.resolve(__dirname, "./stories.json");
const storyJson = require(storyJsonPath);

const getStoryIndex = (id) => {
    id = parseInt(id, 10);
    return storyJson.findIndex(story => story.id === id);
};

const consolidate = (staticStories) => {
    staticStories.forEach(staticStory => {
        const storyDb = storyJson.find(story => story.id === staticStory.id);
        if (storyDb) {
            Object.keys(storyDb).forEach(key => staticStory[key] = storyDb[key]);
        }
    });
};

module.exports = function (staticDb) {
    consolidate(staticDb.stories);

    router.get("/", (req, res) => {
        res.json(staticDb.stories);
    });

    router.get("/:id", (req, res) => {
        const id = parseInt(req.params.id, 10);
        const story = staticDb.stories.find(storyCandidate => storyCandidate.id === id);

        if (story) {
            res.json(story);
        } else {
            res.status(404).end();
        }
    });

    router.post("/", (req, res) => {
        const storyIndex = getStoryIndex(req.body.id);
        if (storyIndex > -1) {
            storyJson[storyIndex] = req.body;
        } else {
            storyJson.push(req.body);
        }
        return fs.writeFile(storyJsonPath, JSON.stringify(storyJson), (err) => {
            if (err) {
                return res.status(500).end();
            }
            consolidate(staticDb.stories);
            return res.status(200).end();
        });
    });

    return router;
};
