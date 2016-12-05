var init = require('express').Router();
var school_regions = require('./school_regions');
var school_types = require('./school_types');
var schools = require('./schools');
var task_types = require('./task_types');
var tasks = require('./tasks');

init.post('/school-regions', school_regions);
init.post('/school-types', school_types);
init.post('/schools', schools);
init.post('/task-types', task_types);
init.post('/tasks', tasks);

module.exports = init;
