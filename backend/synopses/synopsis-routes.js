"use strict";

const express = require("express");
const router = express.Router();
const staticDb = require("../static-db");

router.use("/", (req, res) => {
    res.json(staticDb.synopses);
});

module.exports = router;
