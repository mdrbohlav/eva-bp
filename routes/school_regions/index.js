var school_regions = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

var SchoolRegion = require('../../models/school_region');

school_regions.param('schoolRegionId', function(req, res, next, value) {
    var schoolRegion = SchoolRegion.where({ id: value * 1 });

    schoolRegion.count('id').then(function(count) {
        if (count > 0) {
            next();
        } else {
            res.status(404).json({ 
                error: {
                    code: 404,
                    name: 'Not Found'
                },
                message: 'Invalid school region ID.'
            });
        }
    }).catch(function(error) {
        res.status(400).json(error);
    });
});

school_regions.get('/', all);
school_regions.get('/:schoolRegionId', single);
school_regions.post('/', post);
school_regions.delete('/:schoolRegionId', del);

module.exports = school_regions;
