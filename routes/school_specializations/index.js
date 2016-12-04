var school_specializations = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

var SchoolSpecialization = require('../../models/school_type');

school_specializations.param('schoolSpecializationId', function(req, res, next, value) {
    var schoolSpecialization = SchoolSpecialization.where({ id: value * 1 });

    schoolSpecialization.count('id').then(function(count) {
        if (count > 0) {
            next();
        } else {
            res.status(404).json({ 
                error: {
                    code: 404,
                    name: 'Not Found'
                },
                message: 'Invalid school specialization ID.'
            });
        }
    }).catch(function(error) {
        res.status(400).json(error);
    });
});

school_specializations.get('/', all);
school_specializations.get('/:schoolSpecializationId', single);
school_specializations.post('/', post);
school_specializations.delete('/:schoolSpecializationId', del);

module.exports = school_specializations;
