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
            console.log(model)
            if (model.id === i) {
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
            console.log(model)
            if (model.id === i) {
                res.status(200).json({ success: true });
            }
        }).catch(function(error) {
            console.log(error)
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
