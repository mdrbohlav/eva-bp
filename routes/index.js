var routes = require('express').Router();

var School = require('../models/school');

var schools = require('./schools'),
    school_types = require('./school_types'),
    school_regions = require('./school_regions'),
    tasks = require('./tasks'),
    task_types = require('./task_types'),
    users = require('./users'),
    html = require('./html'),
    init = require('./init'),
    update = require('./update'),
    submit = require('./submit');

function isUniversity(school) {
    return school.level === 'vysoká škola';
}

function isHigherSchool(school) {
    return school.level === 'vyšší odborná škola';
}

routes.get('/', function(req, res, next) {
    console.log(req.ip);
    console.log(req.headers['user-agent']);
    School.where({ soft_deleted: false }).fetchAll().then(function(collection) {
        collection.load(['type', 'region']).then(function(loadedCollection) {
            var json = loadedCollection.toJSON();
            var universities = json.filter(isUniversity);
            var higherSchools = json.filter(isHigherSchool);

            res.render('index', {
                title: 'Dotazník',
                page: 'questionnaire',
                universities: universities,
                higherSchools: higherSchools
            });
        });
    }).catch(function(error) {
        res.render('error', {
            page: 'error',
            error: error
        });
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
routes.use('/html/task', html);
routes.use('/init', init);
routes.use('/update', update);

module.exports = routes;
