"use strict";

const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const s3 = bluebird.promisifyAll(new AWS.S3());
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./ravaged-minds-db-backup.json");

const params = { Bucket: "ravaged-minds", Key: "ravaged-minds-db-backup.json" };
const writeParams = JSON.parse(JSON.stringify(params));

AWS.config.update({
    region: "us-west-2"
});

const readBackup = () => {
    return s3.getObjectAsync(params).then(data => {
        console.log(`DB backup file loaded to ${filePath}`);
        return fs.writeFileSync(filePath, data.Body);
    });
};

const writeBackup = () => {
    writeParams.Body = fs.readFileSync(filePath);
    return s3.putObjectAsync(writeParams).then(data => {
        //console.log(`DB backup file written from ${filePath}\n`);
        return data;
    });
};

module.exports = { readBackup, writeBackup };
