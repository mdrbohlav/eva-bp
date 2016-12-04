var school_regions = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

school_regions.get('schoolRegionId', function(req, res, next, value) {
    // zkontrolovat, jestli value je platné id školy... next(); nebo res.status(404).send('Invalid model ID');
    next();
});

school_regions.get('/', all);
school_regions.get('/:schoolRegionId', single);
school_regions.post('/', post);
school_regions.delete('/:schoolRegionId', del);

module.exports = school_regions;
