const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = express.Router();
const PORT = 8000;

let Task = require('./task-model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/tasks', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("Database connected");
})

taskRoutes.route('/').get(function(req, res) {
    Task.find(function(err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    });
});

taskRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Task.findById(id, function(err, task) {
        res.json(task);
    });
});

taskRoutes.route('/add-task').post(function(req, res) {
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json({'task': 'task added!!'});
        })
        .catch(err => {
            res.status(400).send('adding task failed');
        });
});

app.use('/tasks', taskRoutes);

app.listen(PORT, function() {
    console.log("Server running on:" + PORT);
});