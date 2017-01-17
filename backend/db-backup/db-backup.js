const fs = require("fs");
const path = require("path");
const bluebird = require("bluebird");
const mongoose = require("mongoose");
const dbS3 = require("./db-s3");

const collections = [{
    name: "entities",
    model: bluebird.promisifyAll(require("../entities/entity.model"))
}, {
    name: "maps",
    model: bluebird.promisifyAll(require("../maps/map.model"))
}, {
    name: "stories",
    model: bluebird.promisifyAll(require("../stories/story.model"))
}, {
    name: "notes",
    model: bluebird.promisifyAll(require("../notes/note.model"))
}];

const promises = [];
const backupData = {};

const backupCollection = (collection) => {
    promises.push(collection.model.findAsync().then(docs => {
        backupData[collection.name] = docs;
        console.log(`Done reading ${collection.name}.`);
    }));
};

module.exports = () => {
    // mongoose.connect("mongodb://127.0.0.1/ravaged_minds");
    collections.forEach(collection => backupCollection(collection));

    Promise.all(promises).then(() => {
        fs.writeFileSync(path.resolve(__dirname, "./ravaged-minds-db-backup.json"), JSON.stringify(backupData));
        console.log("Backup file written.");
        dbS3.writeBackup();
    });
}
