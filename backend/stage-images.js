const fs = require("fs");
const path = require("path");
const imagemin = require("imagemin");
const imageminPngQuant = require("imagemin-pngquant");

module.exports = () => {
    imagemin([
        path.resolve(__dirname, "../story-assets/images/*.{jpg,png}")
    ], path.resolve(process.cwd(), "public/images"), {
        plugins: [
            imageminPngQuant({quality: "65-80"})
        ]
    }).then(files => {
        files.forEach(file => {
            console.log(`Shrink & write: ${file.path}`)
        });
    });
}
