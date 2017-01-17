const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Story = new Schema({
    id: Number,
    complete: Boolean,
    completed: Date,
    success: Boolean
});

module.exports = mongoose.model("Story", Story);
