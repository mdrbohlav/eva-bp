'use strict';

var Bookshelf = require('../config/bookshelf');

require('./user');
require('./task');
var Result = Bookshelf.Model.extend({
    tableName: 'results',
    idAttribute: ['user_id', 'task_id'],

    user: function() {
        return this.belongsTo('User');
    },

    task: function() {
        return this.belongsTo('Task');
    },

    hasTimestamps: true
});

module.exports = Bookshelf.model('Result', Result);
