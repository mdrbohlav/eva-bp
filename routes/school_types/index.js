var school_types = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

school_types.get('schoolTypeId', function(req, res, next, value) {
    // zkontrolovat, jestli value je platné id školy... next(); nebo res.status(404).send('Invalid model ID');
    next();
});

school_types.get('/', all);
school_types.get('/:schoolTypeId', single);
school_types.post('/', post);
school_types.delete('/', del);

module.exports = school_types;
