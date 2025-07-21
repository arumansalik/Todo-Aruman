const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
    userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("todos", TodoSchema);