var htmls = require('express').Router();
var single = require('./single');

var Task = require('../../models/task');

htmls.param('taskId', function(req, res, next, value) {
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

htmls.get('/:taskId', single);

module.exports = htmls;
