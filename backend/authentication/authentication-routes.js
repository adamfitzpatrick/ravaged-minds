"use strict";

const jwt = require("jsonwebtoken");
const express = require("express");
const passwords = {
    player: process.env.RAVAGED_MINDS_PLAYER_PASSWORD,
    dm: process.env.RAVAGED_MINDS_DM_PASSWORD
};
const secret = process.env.JWT_SECRET;

const router = express.Router();


router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) { return res.status(401).end(); }
    if (password === passwords[username]) {
        let token = jwt.sign({ username: username }, secret, { expiresIn: "24h" });
        return res.json({ username, token });
    }
    return res.status(401).end();
});

module.exports = router;
