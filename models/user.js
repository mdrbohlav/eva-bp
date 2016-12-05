'use strict';

var Bookshelf = require('../config/bookshelf');

require('./school');
require('./result');
var User = Bookshelf.Model.extend({
    tableName: 'users',

    school: function() {
        return this.belongsTo('School');
    },

    results: function() {
        return this.hasMany('Result');
    },

    hasTimestamps: true
});

module.exports = Bookshelf.model('User', User);
