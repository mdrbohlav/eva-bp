var schools = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

schools.get('schoolId', function(req, res, next, value) {
    // zkontrolovat, jestli value je platné id školy... next(); nebo res.status(404).send('Invalid model ID');
    next();
});

schools.get('/', all);
schools.get('/:schoolId', single);
schools.post('/', post);
schools.delete('/', del);

module.exports = schools;
