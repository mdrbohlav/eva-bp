var routes = require('express').Router();

var User = require('../models/user'),
    School = require('../models/school');

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
  if (req.query.pass !== 'supertajne') {
    res.status(400).render('error', {
      page: 'error',
      message: 'Not Found',
      error: {
        status: 404
      }
    });
    return;
  }

  User.forge().orderBy('updated_at', 'ASC').fetchAll().then(function(collection) {
      collection.load(['school', 'results']).then(function(loadedCollection) {
          res.render('results', {
            title: 'Výsledky',
            page: 'results',
            data: loadedCollection.toJSON(),
            correctAnswers: {
              1: ['c', 'a', 'b', 'c', 'a'],
              4: ['a', 'c', 'c', 'b', 'c'],
              2: [
                'třešeň, kiwi, jahoda, citron',
                'mrkev, meloun, rajče, paprika',
                'želva, pes, panda, jablko, opice',
                'žirafa, ovce, mrkev, liška, prase',
                'myš, citron, rajče, had, paprika, krokodýl',
                'veverka, maliny, slon, kiwi, kůň, kukuřice',
                'meloun, medvěd, dýně, kočka, borůvky, banán, klokan',
                'ježek, hruška, hrozno, brokolice, tučňák, panda, kráva',
                'ředkev, mrkev, želva, slon, slepice, maliny, pes, kočka',
                'pes, veverka, kuře, třešeň, rajče, osel, kočka, paprika'
              ],
              5: [
                'mrkev, opice, kukuřice, krokodýl',
                'liška, třešeň, žirafa, jahoda',
                'kiwi, rajče, meloun, paprika, citron',
                'prase, kůň, borůvky, slon, ježek',
                'ovce, panda, banán, tučňák, maliny, medvěd',
                'kočka, slepice, myš, hrozno, kuře, had',
                'ředkev, hruška, osel, veverka, slon, klokan, želva',
                'dýně, borůvky, pes, kočka, brokolice, medvěd, paprika',
                'kráva, kočka, kuře, panda, pes, kiwi, jahoda, želva',
                'rajče, pes, třešeň, krokodýl, meloun, kůň, banán, hrozno'
              ],
              3: [
                '3, 4, 1, 2',
                '2, 7, 8, 5',
                '9, 2, 3, 5, 4',
                '8, 1, 2, 3, 0',
                '1, 4, 5, 9, 2, 7',
                '2, 0, 4, 3, 8, 5',
                '9, 2, 3, 1, 4, 5, 6',
                '5, 4, 2, 7, 8, 0, 3',
                '0, 1, 5, 9, 3, 7, 1, 4',
                '5, 2, 6, 4, 7, 3, 8, 1'
              ],
              6: [
                '5, 4, 8, 9',
                '3, 7, 5, 1',
                '2, 7, 3, 9, 0',
                '1, 1, 6, 2, 3',
                '8, 5, 6, 0, 1, 8',
                '7, 9, 1, 3, 6, 3',
                '4, 3, 7, 4, 1, 6, 5',
                '6, 0, 5, 2, 9, 1, 3',
                '1, 2, 6, 0, 2, 6, 0, 5',
                '6, 3, 7, 5, 8, 4, 9, 2'
              ]
            }
          });
      });
  }).catch(function(error) {
      res.status(400).json(error);
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
