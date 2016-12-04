'use strict';

var Bookshelf = require('../config/bookshelf');

require('./school_type');
require('./school_region');
require('./user');
var School = Bookshelf.Model.extend({
    tableName: 'schools',

    type: function() {
        return this.belongsTo('SchoolType');
    },

    region: function() {
        return this.belongsTo('SchoolRegion');
    },

    users: function() {
        return this.hasMany('User');
    }
});

module.exports = Bookshelf.model('School', School);
