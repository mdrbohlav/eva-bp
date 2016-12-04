var results = require('express').Router({ mergeParams: true });
var all = require('./all');

results.get('/', all);

module.exports = results;
