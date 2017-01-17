const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Map = new Schema({
    id: Number,
    playerVisible: Boolean,
    playerClickable: Boolean
});

module.exports = mongoose.model("Map", Map);
