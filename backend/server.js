module.exports = () => {
    "use strict";

    const jsonServer = require("json-server");
    const db = require("./db.js");

    const server = jsonServer.create();

    server.use(jsonServer.defaults());
    const router = jsonServer.router(db);

    server.use(router);

    server.listen(3012);
};
