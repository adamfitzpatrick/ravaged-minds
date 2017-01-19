"use strict";

const express = require("express");
const router = express.Router();
const NoteModel = require("./note.model");
const ObjectId = require("mongoose").Types.ObjectId;

const handleErr = (err, res) => {
    return res.send(err).status(500).end();
};

router.get("/", (req, res) => {
    let query = req.query;
    if (query && query.id) {
        if (!(query.id instanceof Array)) { query.id = [query.id]; }
        const ids = req.query.id.map(id => parseInt(id, 10));
        query.id = { $in: ids };
    }
    return NoteModel.find(query, (err, notes) => {
        if (err) { return handleErr(err, res); }
        return res.json(notes);
    });
});

router.get("/:idOrType", (req, res) => {
    const idOrType = req.params.idOrType;
    if (idOrType === "entity" || idOrType === "story" || idOrType === "map") {
        return NoteModel.find({ linkType: idOrType }, (err, notes) => {
            if (err) { return handleErr(err, res); }
            return res.json(notes);
        });
    }
    return NoteModel.findById(idOrType, (err, note) => {
        if (err) { return handleErr(err, res); }
        return res.json(note);
    });
});

router.post("/", (req, res) => {
    if (!req.body._id) { req.body._id = ObjectId(); }
    NoteModel.findByIdAndUpdate(req.body._id, req.body, { upsert: true }, (err) => {
        if (err) { return handleErr(err, res); }
        return res.status(200).end();
    });
});

router.delete("/:id", (req, res) => {
    NoteModel.remove({ _id: ObjectId(req.params.id)}, (err) => {
        if (err) { return handleErr(err, res); }
        return res.status(200).end();
    })
});

module.exports = router;
