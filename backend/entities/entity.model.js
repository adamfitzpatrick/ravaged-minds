const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Entity = new Schema({
    id: Number,
    playerVisible: Boolean
});

module.exports = mongoose.model("Entity", Entity);
