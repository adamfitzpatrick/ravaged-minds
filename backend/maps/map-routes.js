"use strict";

const express = require("express");
const router = express.Router();
const staticMapDb = require("../static-db").maps;
const MapModel = require("./map.model");

const populateFromSchema = (dynamicMap, staticMap) => {
    if (!dynamicMap) { return; }
    Object.keys(MapModel.schema.obj).forEach(key => staticMap[key] = dynamicMap[key]);
};

const consolidate = (dynamicMaps, staticMaps) => {
    return staticMaps.map(staticMap => {
        const dynamicMap = dynamicMaps.find(map => map.id === staticMap.id);
        if (dynamicMap) { populateFromSchema(dynamicMap, staticMap); }
        return staticMap;
    }).sort((a, b) => a.id - b.id);
};

const findStaticById = (id) => {
    return staticMapDb.filter(map => map.id === id)[0];
};

const findStaticByIds = (ids) => {
    if (!ids) { return staticMapDb; }
    return staticMapDb.filter(map => ids.some(id => id === map.id));
};

router.get("/", (req, res) => {
    let query = {};
    let ids;
    if (req.query && req.query.id) {
        if (!(req.query.id instanceof Array)) { req.query.id = [req.query.id]; }
        ids = req.query.id.map(id => parseInt(id, 10));
        query = { id: { $in: ids }};
    }

    return MapModel.find(query, (err, maps) => {
        if (err) { return res.send(err).status(500).end(); }
        return res.json(consolidate(maps, findStaticByIds(ids)));
    });
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    return MapModel.findOne({ id: id }, (err, map) => {
        if (err) { return res.send(err).status(500).end(); }
        const staticMap = findStaticById(id);
        populateFromSchema(map, staticMap);
        return res.json(staticMap);
    });
});

router.post("/", (req, res) => {
    MapModel.findOneAndUpdate({ id: req.body.id }, req.body, { upsert: true}, (err) => {
        if (err) { return res.send(err).status(500).end(); }
        return res.status(200).end();
    });
});

module.exports = router;
