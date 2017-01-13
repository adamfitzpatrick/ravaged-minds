"use strict";

const router = require("json-server").create();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const playerJsonPath = path.resolve(__dirname, "./players.json");
const playerJson = require(playerJsonPath);

const getPlayerIndex = (id) => {
    return playerJson.findIndex(player => player.id === id);
};

const writeData = (req, res) => {
    return fs.writeFile(playerJsonPath, JSON.stringify(playerJson), (err) => {
        if (err) {
            return res.status(500).end();
        }
        return res.json(req.body || req.params);
    });
};

module.exports = function () {

    router.get("/", (req, res) => {
        res.json(playerJson);
    });

    router.post("/", (req, res) => {
        if (!req.body.id) { req.body.id = uuid.v4(); }
        const playerIndex = getPlayerIndex(req.body.id);
        if (playerIndex > -1) {
            playerJson[playerIndex] = req.body;
        } else {
            playerJson.push(req.body);
        }
        return writeData(req, res);
    });

    return router;
};
