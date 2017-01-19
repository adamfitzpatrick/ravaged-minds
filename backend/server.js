const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const schedule = require("node-schedule");

const gatekeeper = require("./authentication/gatekeeper");
const dbRestore = require("./db-backup/db-restore");
const dbBackup = require("./db-backup/db-backup");

port = 3012;
let scheduleString = "*/10 * * * *";
if (process.env.PRODUCTION && process.env.PRODUCTION !== "false") {
    port = 80;
    scheduleString = "* */4 * * *';"
}

const startBackendApplication = () => {
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

    app.listen(port);
    console.log(`\nServer listening on port ${port}.`)
};

module.exports = () => {
    "use strict";

    require("./stage-images")();

    mongoose.connect("mongodb://127.0.0.1:27017/ravaged_minds");

    dbRestore().then(() => {
        schedule.scheduleJob(scheduleString, () => {
            console.log(`\nStarting DB Backup... at ${new Date().toISOString()}`);
            dbBackup().then(() => {
                console.log(`DB Backup complete.\n`);
            }).catch(err => {
                console.log(err);
            });
        });
        startBackendApplication();
    }).catch(err => {
        console.log(err);
        startBackendApplication();
    });
};
