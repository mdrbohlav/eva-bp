var tasks = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

var Task = require('../../models/task');

tasks.param('taskId', function(req, res, next, value) {
    var task = Task.where({ id: value * 1 });

    task.count('id').then(function(count) {
        if (count > 0) {
            next();
        } else {
            res.status(404).json({ 
                error: {
                    code: 404,
                    name: 'Not Found'
                },
                message: 'Invalid task ID.'
            });
        }
    }).catch(function(error) {
        res.status(400).json(error);
    });
});

tasks.get('/', all);
tasks.get('/:taskId', single);
tasks.post('/', post);
tasks.delete('/:taskId', del);

module.exports = tasks;
