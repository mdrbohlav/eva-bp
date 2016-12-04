var users = require('express').Router();
var all = require('./all');
var single = require('./single');
var results = require('./results');
var post = require('./post');
var del = require('./delete');

users.get('userId', function(req, res, next, value) {
    // zkontrolovat, jestli value je platné id školy... next(); nebo res.status(404).send('Invalid model ID');
    next();
});

users.get('/', all);
users.get('/:userId', single);
users.use('/:userId/results', results);
users.post('/', post);
users.delete('/', del);

module.exports = users;
