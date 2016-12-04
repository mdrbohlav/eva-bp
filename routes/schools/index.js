var schools = require('express').Router();
var all = require('./all');
var single = require('./single');
var post = require('./post');
var del = require('./delete');

var School = require('../../models/school');

schools.param('schoolId', function(req, res, next, value) {
    var school = School.where({ id: value * 1 });

    school.count('id').then(function(count) {
        if (count > 0) {
            next();
        } else {
            res.status(404).json({ 
                error: {
                    code: 404,
                    name: 'Not Found'
                },
                message: 'Invalid school ID.'
            });
        }
    }).catch(function(error) {
        res.status(400).json(error);
    });
});

schools.get('/', all);
schools.get('/:schoolId', single);
schools.post('/', post);
schools.delete('/:schoolId', del);

module.exports = schools;
