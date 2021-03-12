const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
    task_description: {
        type: String
    },
    task_date: {
        type: Date,
        default: Date.now
    },
    task_starred: {
        type: Boolean
    },
    todo_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Task', Task);