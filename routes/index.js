var routes = require('express').Router();

var schools = require('./schools'),
    school_types = require('./school_types'),
    school_regions = require('./school_regions'),
    tasks = require('./tasks'),
    task_types = require('./task_types'),
    users = require('./users'),
    init = require('./init'),
    submit = require('./submit');

routes.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Hlavní strana',
        page: 'main'
    });
});

routes.get('/questionnaire', function(req, res, next) {
    res.render('questionnaire', {
        title: 'Dotazník',
        page: 'questionnaire'
    });
});

routes.get('/results', function(req, res, next) {
    res.render('results', {
        title: 'Výsledky',
        page: 'results'
    });
});

routes.post('/submit', submit);

routes.use('/schools', schools);
routes.use('/school-types', school_types);
routes.use('/school-regions', school_regions);
routes.use('/tasks', tasks);
routes.use('/task-types', task_types);
routes.use('/users', users);
routes.use('/init', init);

module.exports = routes;
