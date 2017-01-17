const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Note = new Schema({
    _id: ObjectId,
    note: String,
    date: Date,
    linkId: Number,
    linkType: String,
    playerVisible: Boolean
});

module.exports = mongoose.model("Note", Note);
