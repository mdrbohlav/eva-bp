var routes = require('express').Router();

var schools = require('./schools'),
    school_types = require('./school_types'),
    school_regions = require('./school_regions'),
    school_specializations = require('./school_specializations'),
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

routes.use('/schools', schools);
routes.use('/school-types', school_types);
routes.use('/school-regions', school_regions);
routes.use('/school-specializations', school_specializations);
routes.use('/tasks', tasks);
routes.use('/task-types', task_types);
routes.use('/users', users);

module.exports = routes;
