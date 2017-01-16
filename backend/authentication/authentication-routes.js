"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const hashedPasswords = require("./hashed-passwords.json");
const secret = require("./jwt-secret.json").secret;

const router = express.Router();


router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) { return res.status(401).end(); }
    return bcrypt.compare(password, hashedPasswords[username], (err, result) => {
        if (result) {
            let token = jwt.sign({ username: username }, secret, { expiresIn: "24h" });
            return res.json({ username, token });
        }
        return res.status(401).end();
    });
});

module.exports = router;
