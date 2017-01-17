"use strict";

const express = require("express");
const router = express.Router();
const staticStoryDb = require("../static-db").stories;
const StoryModel = require("./story.model");

const populateFromSchema = (dynamicStory, staticStory) => {
    if (!dynamicStory) { return; }
    Object.keys(StoryModel.schema.obj).forEach(key => staticStory[key] = dynamicStory[key]);
};

const consolidate = (dynamicStories, staticStories) => {
    return staticStories.map(staticStory => {
        const dynamicStory = dynamicStories.find(story => story.id === staticStory.id);
        if (dynamicStory) { populateFromSchema(dynamicStory, staticStory); }
        return staticStory;
    }).sort((a, b) => a.id - b.id);
};

const findStaticById = (id) => {
    return staticStoryDb.filter(story => story.id === id)[0];
};

const findStaticByIds = (ids) => {
    if (!ids) { return staticStoryDb; }
    return staticStoryDb.filter(story => ids.some(id => id === story.id));
};

router.get("/", (req, res) => {
    let query = {};
    let ids;
    if (req.query && req.query.id) {
        if (!(req.query.id instanceof Array)) { req.query.id = [req.query.id]; }
        ids = req.query.id.map(id => parseInt(id, 10));
        query = { id: { $in: ids }};
    }

    return StoryModel.find(query, (err, stories) => {
        if (err) { return res.send(err).status(500).end(); }
        return res.json(consolidate(stories, findStaticByIds(ids)));
    });
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    return StoryModel.findOne({ id: id }, (err, story) => {
        if (err) { return res.send(err).status(500).end(); }
        const staticStory = findStaticById(id);
        populateFromSchema(story, staticStory);
        return res.json(staticStory);
    });
});

router.post("/", (req, res) => {
    StoryModel.findOneAndUpdate({ id: req.body.id }, req.body, { upsert: true}, (err) => {
        if (err) { return res.send(err).status(500).end(); }
        return res.status(200).end();
    });
});

module.exports = router;
