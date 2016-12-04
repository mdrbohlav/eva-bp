'use strict';

var Bookshelf = require('../config/bookshelf');

require('./task_type');
require('./result');
var Task = Bookshelf.Model.extend({
    tableName: 'tasks',

    type: function() {
        return this.belongsTo('TaskType');
    },

    results: function() {
        return this.hasMany('Result');
    }
});

module.exports = Bookshelf.model('Task', Task);
