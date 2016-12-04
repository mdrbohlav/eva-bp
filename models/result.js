'use strict';

var Bookshelf = require('../config/bookshelf');

require('./user');
require('./task');
var Result = Bookshelf.Model.extend({
    tableName: 'results',

    user: function() {
        return this.belongsTo('User');
    },

    task: function() {
        return this.belongsTo('Task');
    }
});

module.exports = Bookshelf.model('Result', Result);
