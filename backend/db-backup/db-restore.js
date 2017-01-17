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

let restoreData;
const promises = [];

const restoreCollection = (collection) => {
    const collectionPromises = [];
    const data = restoreData[collection.name]
    restoreData[collection.name].forEach(doc => {
        collectionPromises.push(collection.model
            .findByIdAndUpdateAsync(doc._id, doc, { upsert: true }).then(() => {
            console.log(`${collection.name} ${doc._id} restored.`);
        }));
    });
    return Promise.all(collectionPromises).then(() => {
        console.log(`Done restoring ${collection.name}.`);
    })
};

const cleanDocs = (collection) => {
    collection.forEach(doc => {
        delete doc.__v;
    });
};

mongoose.connect("mongodb://127.0.0.1/ravaged_minds");

promises.push(dbS3.readBackup().then(() => {
    const filePath = path.resolve(__dirname, "./ravaged-minds-db-backup.json");
    restoreData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    Object.keys(restoreData).forEach(key => {
        cleanDocs(restoreData[key]);
    });
    collections.forEach(collection => restoreCollection(collection));
}));

Promise.all(promises).then(() => {
    console.log("Finished restoring data.");
});
