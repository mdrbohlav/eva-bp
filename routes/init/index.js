var init = require('express').Router();
var school_regions = require('./school_regions');
var school_types = require('./school_types');
var schools = require('./schools');

init.post('/school-regions', school_regions);
init.post('/school-types', school_types);
init.post('/schools', schools);

module.exports = init;
