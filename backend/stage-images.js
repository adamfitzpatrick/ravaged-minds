const path = require("path");
const copyDir = require("copy-dir");
const mkdirp = require("mkdirp");

module.exports = () => {
    mkdirp.sync(path.resolve(process.cwd(), "./public/images"));
    copyDir.sync(
        path.resolve(process.cwd(), "./story-assets/images"),
        path.resolve(process.cwd(), "./public/images")
    );
};
