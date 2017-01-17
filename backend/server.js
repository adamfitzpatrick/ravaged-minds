const http2 = require("spdy");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const yargs = require("yargs").argv;
const mongoose = require("mongoose");
const schedule = require("node-schedule");

const env = yargs.env || "prod";
const appConfig = require("./app-config.json")[env];
const gatekeeper = require("./authentication/gatekeeper");

module.exports = () => {
    "use strict";

    require("./stage-images")();

    mongoose.connect("mongodb://127.0.0.1/ravaged_minds");
    //schedule.scheduleJob("0 1 * * * *", require("./db-backup/db-backup"));

    const app = express();

    app.use(helmet());
    app.use(bodyParser.json());
    app.use(morgan("dev"));

    app.use(express.static(path.resolve(__dirname, "../public")));

    app.all(/\/(?!login).*/, gatekeeper);
    app.use("/login", require("./authentication/authentication-routes"));
    app.use("/stories", require("./stories/story-routes"));
    app.use("/maps", require("./maps/map-routes"));
    app.use("/entities", require("./entities/entity-routes"));
    app.use("/notes", require("./notes/note-routes"));
    app.use("/synopses", require("./synopses/synopsis-routes"));

    app.listen(appConfig.port);
    console.log(`\nServer listening on http://localhost:${appConfig.port}.`)
};
