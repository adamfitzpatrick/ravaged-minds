"use strict";

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const entityJsonPath = path.resolve(__dirname, "./entities.json");
const entityJson = require(entityJsonPath);
const staticDb = require("../static-db");

const getEntityIndex = (id) => {
    id = parseInt(id, 10);
    return entityJson.findIndex(entity => entity.id === id);
};

const consolidate = (staticEntities) => {
    staticEntities.forEach(staticMap => {
        const entityDb = entityJson.find(entity => entity.id === staticMap.id);
        if (entityDb) { Object.keys(entityDb).forEach(key => staticMap[key] = entityDb[key]); }
    });
};

consolidate(staticDb.entities);

router.get("/", (req, res) => {
    if (!req.query || !req.query.id) {
        return res.json(staticDb.entities);
    }

    if (req.query.id) {
        if (!(req.query.id instanceof Array)) { req.query.id = [req.query.id]; }
        const ids = req.query.id.map(id => parseInt(id, 10));
        return res.json(staticDb.entities.filter(entity => ids.some(id => entity.id === id)));
    }
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const entity = staticDb.entities.find(entityCandidate => entityCandidate.id === id);

    if (entity) {
        res.json(entity);
    } else {
        res.status(404).end();
    }
});

router.post("/", (req, res) => {
    const entityIndex = getEntityIndex(req.body.id);
    if (entityIndex > -1) {
        entityJson[entityIndex] = req.body;
    } else {
        entityJson.push(req.body);
    }
    return fs.writeFile(entityJsonPath, JSON.stringify(entityJson), (err) => {
        if (err) {
            return res.status(500).end();
        }
        consolidate(staticDb.entities);
        return res.status(200).end();
    });
});

module.exports = router;
