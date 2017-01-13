const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const pushImages = require(path.resolve(process.cwd(), "./story-assets/images/push-images.json"));

router.get("/", (req, res) => {
    const filePath = "/images/global-map.png";
    //const pushFilePaths = pushImages.map(image => `/images/${image}`);
    //pushFilePaths.forEach(filePath => {
        const extension = filePath.match(/\.[a-z]+$/)[0];
        const fullPath = path.resolve(process.cwd(), "./public", `.${filePath}`);
        const fileContents = fs.readFileSync(fullPath);
        const stream = res.push(filePath, {
            status: 200, // optional
            method: 'GET', // optional
            request: {
                accept: '*/*'
            },
            response: {
                "content-type": `image/${extension}`
            }
        });
        stream.on("error", (err) => {
            throw new Error(err);
        });
        stream.end(fileContents);
    //});
    res.end();
});

module.exports = router;
