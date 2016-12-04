var school_specializations = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

school_specializations.get('schoolSpecializationId', function(req, res, next, value) {
    // zkontrolovat, jestli value je platné id školy... next(); nebo res.status(404).send('Invalid model ID');
    next();
});

school_specializations.get('/', all);
school_specializations.get('/:schoolSpecializationId', single);
school_specializations.post('/', post);
school_specializations.delete('/:schoolSpecializationId', del);

module.exports = school_specializations;
