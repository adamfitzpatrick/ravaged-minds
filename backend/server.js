const http2 = require("spdy");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const yargs = require("yargs").argv;

const env = yargs.env || "prod";
const appConfig = require("./app-config.json")[env];

module.exports = (webpack) => {
    "use strict";

    require("./stage-images")();

    const app = express();

    app.use(bodyParser.json());
    app.use(morgan("dev"));

    app.use(express.static(path.resolve(__dirname, "../public")));

    //app.use("/push-resources", require("./push/push-routes"));

    app.use("/stories", require("./stories/story-routes"));
    app.use("/maps", require("./maps/map-routes"));
    app.use("/entities", require("./entities/entity-routes"));
    app.use("/notes", require("./notes/note-routes"));
    app.use("/synopses", require("./synopses/synopsis-routes"));
    app.use("/players", require("./players/player-routes"));

    const options = {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.crt')
    };

    if (webpack) {
        app.listen(appConfig.port);
        console.log(`\nServer listening on http://localhost:${appConfig.port}.`)
    } else {
        http2
            .createServer(options, app)
            .listen(appConfig.port, () => {
                    console.log(`\nServer listening on https://localhost:${appConfig.port}.`)
                }
            )
    }
};
