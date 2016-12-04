var routes = require('express').Router();

var schools = require('./schools'),
    school_types = require('./school_types'),
    school_regions = require('./school_regions'),
    tasks = require('./tasks'),
    task_types = require('./task_types'),
    users = require('./users');

routes.get('/', function(req, res, next) {
    res.render('index', { title: 'Hlavní strana' });
});

routes.get('/questionnaire', function(req, res, next) {
    res.render('questionnaire', { title: 'Dotazník' });
});

routes.get('/submit', function(req, res, next) {
    res.status(200).json({ success: true });
});

var SchoolType = require('../models/school_type');

routes.post('/init-school-types', function(req, res, next) {
    var types = [
        'veřejná',
        'soukromá',
        'státní',
        'církevní',
        'družstevní',
        'vojenská',
        'obecně prospěšná společnost'
    ];

    for (var i = 0; i < types.length; i++) {
        schoolType = new SchoolType({ name: types[i] });

        schoolType.save().then(function(model) {
            if (model.id === types.length) {
                res.status(200).json({ success: true });
            }
        }).catch(function(error) {
            console.log(error)
        });
    }
});

var SchoolRegion = require('../models/school_region');

routes.post('/init-school-regions', function(req, res, next) {
    var regions = [
        'Praha',
        'Jihočeský',
        'Jihomoravský',
        'Karlovarský',
        'Královéhradecký',
        'Liberecký',
        'Moravskoslezský',
        'Olomoucký',
        'Pardubický',
        'Plzeňský',
        'Středočeský',
        'Ústecký',
        'Vysočina',
        'Zlínský'
    ];

    for (var i = 0; i < regions.length; i++) {
        schoolRegion = new SchoolRegion({ name: regions[i] });

        schoolRegion.save().then(function(model) {
            if (model.id === regions.length) {
                res.status(200).json({ success: true });
            }
        }).catch(function(error) {
            console.log(error)
        });
    }
});

var School = require('../models/school');
var u = require('../config/vysoke_skoly');

routes.post('/init-schools-1', function(req, res, next) {
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
                    console.log(error);
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
                console.log(error);
            });
        }
    }
});

routes.post('/init-schools-2', function(req, res, next) {
    for (var j = 0; j < u.high_schools.length; j++) {
        var name = u.high_schools[j].name;
        var type = u.high_schools[j].type;
        var region = u.high_schools[j].region;

        var school = new School({
            name: name,
            school_type_id: type,
            school_region_id: region,
            level: 'vyšší odborná škola'
        });

        school.save().then(function(model) {
            console.log(model);
        }).catch(function(error) {
            console.log(error);
        });
    }
});

routes.use('/schools', schools);
routes.use('/school-types', school_types);
routes.use('/school-regions', school_regions);
routes.use('/tasks', tasks);
routes.use('/task-types', task_types);
routes.use('/users', users);

module.exports = routes;
