'use strict';

var Bookshelf = require('../config/bookshelf');

require('./task');
var TaskType = Bookshelf.Model.extend({
    tableName: 'task_types',
    
    tasks: function() {
        return this.hasMany('Task');
    }
});

module.exports = Bookshelf.model('TaskType', TaskType);
