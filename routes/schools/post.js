var School = require('../../models/school');
var u = require('../../config/vysoke_skoly');

module.exports = function(req, res, next) {
    var params = ['name', 'type', 'region'],
        notFound = false;

    /*for (var i = 0; i < params.length; i++) {
        if (!(params[i] in req.body)) {
            notFound = true;
            break;
        }
    }

    if (notFound) {
        res.status(400).json({ 
            error: {
                code: 400,
                name: 'Bad Request'
            },
            message: 'Missing required parameter.'
        });
    } else {
        var school = new School({
            name: req.body.name,
            school_type_id: req.body.type,
            school_region_id: req.body.region
        });

        school.save().then(function(model) {
            res.status(200).json(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }*/

    for (var i = 0; i < u.universities.length; i++) {
        var type = u.universities[i].type;
        var region = u.universities[i].region;

        if ('faculties' in u.universities[i]) {
            for (var k = 0; k < u.universities[i].faculties.length; k++) {
                var name = u.universities[i].name + ' - ' + u.universities[i].faculties[k];

                var school = new School({
                    name: name,
                    school_type_id: type,
                    school_region_id: region,
                    level: 'vysoká škola'
                });

                school.save().then(function(model) {
                    console.log(model);
                }).catch(function(error) {
                    res.status(400).json(error);
                });
            }
        } else {
            var name = u.universities[i].name;

            var school = new School({
                name: name,
                school_type_id: type,
                school_region_id: region,
                level: 'vysoká škola'
            });

            school.save().then(function(model) {
                console.log(model);
            }).catch(function(error) {
                res.status(400).json(error);
            });
        }
    }

    for (var j = 0; j < u.universities.length; j++) {
        var name = u.universities[j].name;
        var type = u.universities[j].type;
        var region = u.universities[j].region;

        var school = new School({
            name: name,
            school_type_id: type,
            school_region_id: region,
            level: 'vyšší odborná škola'
        });

        school.save().then(function(model) {
            console.log(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
