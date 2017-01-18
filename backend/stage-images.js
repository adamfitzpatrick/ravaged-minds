const path = require("path");
const copyDir = require("copy-dir");

module.exports = () => {
    copyDir.sync(
        path.resolve(process.cwd(), "./story-assets/images"),
        path.resolve(process.cwd(), "./public/images")
    );
};
