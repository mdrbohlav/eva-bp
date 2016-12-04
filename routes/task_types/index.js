var task_types = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

var TaskType = require('../../models/task_type');

task_types.param('taskTypeId', function(req, res, next, value) {
    var taskType = TaskType.where({ id: value * 1 });

    taskType.count('id').then(function(count) {
        if (count > 0) {
            next();
        } else {
            res.status(404).json({ 
                error: {
                    code: 404,
                    name: 'Not Found'
                },
                message: 'Invalid task type ID.'
            });
        }
    }).catch(function(error) {
        res.status(400).json(error);
    });
});

task_types.get('/', all);
task_types.get('/:taskTypeId', single);
task_types.post('/', post);
task_types.delete('/:taskTypeId', del);

module.exports = task_types;
