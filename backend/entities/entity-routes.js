"use strict";

const express = require("express");
const router = express.Router();
const staticEntityDb = require("../static-db").entities;
const EntityModel = require("./entity.model");

const populateFromSchema = (dynamicEntity, staticEntity) => {
    if (!dynamicEntity) { return; }
    Object.keys(EntityModel.schema.obj).forEach(key => staticEntity[key] = dynamicEntity[key]);
};

const consolidate = (dynamicEntities, staticEntities) => {
    return staticEntities.map(staticEntity => {
        const dynamicEntity = dynamicEntities.find(entity => entity.id === staticEntity.id);
        if (dynamicEntity) { populateFromSchema(dynamicEntity, staticEntity); }
        return staticEntity;
    }).sort((a, b) => a.id - b.id);
};

const findStaticById = (id) => {
    return staticEntityDb.filter(entity => entity.id === id)[0];
};

const findStaticByIds = (ids) => {
    if (!ids) { return staticEntityDb; }
    return staticEntityDb.filter(entity => ids.some(id => id === entity.id));
};

router.get("/", (req, res) => {
    let query = {};
    let ids;
    if (req.query && req.query.id) {
        if (!(req.query.id instanceof Array)) { req.query.id = [req.query.id]; }
        ids = req.query.id.map(id => parseInt(id, 10));
        query = { id: { $in: ids }};
    }

    return EntityModel.find(query, (err, entities) => {
        if (err) { return res.send(err).status(500).end(); }
        return res.json(consolidate(entities, findStaticByIds(ids)));
    });
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    return EntityModel.findOne({ id: id }, (err, entity) => {
        if (err) { return res.send(err).status(500).end(); }
        const staticEntity = findStaticById(id);
        populateFromSchema(entity, staticEntity);
        return res.json(staticEntity);
    });
});

router.post("/", (req, res) => {
    EntityModel.findOneAndUpdate({ id: req.body.id }, req.body, { upsert: true}, (err) => {
        if (err) { return res.send(err).status(500).end(); }
        return res.status(200).end();
    });
});

module.exports = router;
