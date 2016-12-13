var update = require('express').Router();
var tasks = require('./tasks');

update.put('/tasks', tasks);

module.exports = update;
