var school_types = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

var SchoolType = require('../../models/school_type');

school_types.param('schoolTypeId', function(req, res, next, value) {
    var schoolType = new SchoolType({ id: value * 1 });

    schoolType.count('id').then(function(count) {
        if (count > 0) {
            next();
        } else {
            res.status(404).json({ 
                error: {
                    code: 404,
                    name: 'Not Found'
                },
                message: 'Invalid school type ID.'
            });
        }
    }).catch(function(error) {
        res.status(400).json(error);
    });
});

school_types.get('/', all);
school_types.get('/:schoolTypeId', single);
school_types.post('/', post);
school_types.delete('/:schoolTypeId', del);

module.exports = school_types;
