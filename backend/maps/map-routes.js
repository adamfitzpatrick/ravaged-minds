"use strict";

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const mapJsonPath = path.resolve(__dirname, "./maps.json");
const mapJson = require(mapJsonPath);
const staticDb = require("../static-db");

const getMapIndex = (id) => {
    id = parseInt(id, 10);
    return mapJson.findIndex(map => map.id === id);
};

const consolidate = (staticMaps) => {
    staticMaps.forEach(staticMap => {
        const mapDb = mapJson.find(map => map.id === staticMap.id);
        if (mapDb) { Object.keys(mapDb).forEach(key => staticMap[key] = mapDb[key]); }
    });
};

consolidate(staticDb.maps);

router.get("/", (req, res) => {
    if (!req.query || !req.query.id) {
        return res.json(staticDb.maps);
    }

    if (req.query.id) {
        if (!(req.query.id instanceof Array)) { req.query.id = [req.query.id]; }
        const ids = req.query.id.map(id => parseInt(id, 10));
        return res.json(staticDb.maps.filter(map => ids.some(id => map.id === id)));
    }
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const map = staticDb.maps.find(mapCandidate => mapCandidate.id === id);

    if (map) {
        res.json(map);
    } else {
        res.status(404).end();
    }
});

router.get("/type/:type", (req,res) => {
    const typeMaps = staticDb.maps.filter(map => map.type === req.params.type);
    if (!req.query || !req.query.id) {
        return res.json(typeMaps);
    }
    let ids;
    if (req.query.id && req.query.id instanceof Array) {
        ids = req.query.id.map(id => parseInt(id, 10));
    } else {
        ids = [parseInt(req.query.id, 10)];
    }
    return res.json(typeMaps.filter(map => ids.some(id => map.id === id)));
});

router.post("/", (req, res) => {
    const mapIndex = getMapIndex(req.body.id);
    if (mapIndex > -1) {
        mapJson[mapIndex] = req.body;
    } else {
        mapJson.push(req.body);
    }
    return fs.writeFile(mapJsonPath, JSON.stringify(mapJson), (err) => {
        if (err) {
            return res.status(500).end();
        }
        consolidate(staticDb.maps);
        return res.status(200).end();
    });
});

module.exports = router;
