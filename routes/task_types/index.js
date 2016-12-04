var task_types = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

task_types.get('taskTypeId', function(req, res, next, value) {
    // zkontrolovat, jestli value je platné id školy... next(); nebo res.status(404).send('Invalid model ID');
    next();
});

task_types.get('/', all);
task_types.get('/:taskTypeId', single);
task_types.post('/', post);
task_types.delete('/', del);

module.exports = task_types;
