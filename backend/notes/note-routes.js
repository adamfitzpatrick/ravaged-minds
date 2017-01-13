"use strict";

const router = require("json-server").create();
const fs = require("fs");
const path = require("path");
const noteJsonPath = path.resolve(__dirname, "./notes.json");
const noteJson = require(noteJsonPath);
const uuid = require("uuid");

const getNoteIndex = (id) => {
    return noteJson.findIndex(note => note.id === id);
};

const getNotesOfType = (type) => {
    return noteJson.filter(note => note.linkType === type);
};

const writeData = (req, res) => {
    return fs.writeFile(noteJsonPath, JSON.stringify(noteJson), (err) => {
        if (err) {
            return res.status(500).end();
        }
        return res.json(req.body || req.params);
    });
};

const NOTE_TYPES = [ "entity", "story", "map" ];

module.exports = function () {

    router.get("/", (req, res) => {
        if (req.query.linkId) {
            const linkId = parseInt(req.query.linkId, 10);
            return res.json(noteJson.filter(note => {
                return note.linkId === linkId && note.linkType === req.query.linkType;
            }));
        }
        if (req.query.id) {
            return res.json(noteJson.filter(note => req.query.id.includes(note.id)));
        }
        return res.json(noteJson);
    });

    router.get("/:idOrType", (req, res) => {
        if (NOTE_TYPES.includes(req.params.idOrType)) {
            return res.json(getNotesOfType(req.params.idOrType));
        } else {
            const note = noteJson[getNoteIndex(req.params.idOrType)];
            if (note) {
                return res.json(note);
            } else {
                return res.status(404).end();
            }
        }
    });

    router.post("/", (req, res) => {
        if (!req.body.id) { req.body.id = uuid.v4(); }
        const noteIndex = getNoteIndex(req.body.id);
        if (noteIndex > -1) {
            noteJson[noteIndex] = req.body;
        } else {
            noteJson.push(req.body);
        }
        return writeData(req, res);
    });

    router.delete("/:id", (req, res) => {
        const noteIndex = getNoteIndex(req.params.id);
        if (noteIndex > -1) {
            noteJson.splice(noteIndex, 1);
            return writeData(req, res);
        } else {
            return res.status(500).end();
        }
    });

    return router;
};
