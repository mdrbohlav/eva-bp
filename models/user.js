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
    }
});

module.exports = Bookshelf.model('User', User);
