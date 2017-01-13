const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const staticDb = require("./static-db.js");

module.exports = () => {
    "use strict";

    const server = jsonServer.create();

    server.use(jsonServer.defaults());
    server.use(bodyParser.json());
    const router = jsonServer.router(staticDb);

    server.use("/stories", require("./stories/story-routes")(staticDb));
    server.use("/maps", require("./maps/map-routes")(staticDb));
    server.use("/entities", require("./entities/entity-routes")(staticDb));
    server.use("/notes", require("./notes/note-routes")());
    server.use("/players", require("./players/player-routes")());
    server.use(router);

    server.listen(3012);
};
