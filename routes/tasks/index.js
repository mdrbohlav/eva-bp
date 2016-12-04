var tasks = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

tasks.get('taskId', function(req, res, next, value) {
    // zkontrolovat, jestli value je platné id školy... next(); nebo res.status(404).send('Invalid model ID');
    next();
});

tasks.get('/', all);
tasks.get('/:taskId', single);
tasks.post('/', post);
tasks.delete('/:taskId', del);

module.exports = tasks;
