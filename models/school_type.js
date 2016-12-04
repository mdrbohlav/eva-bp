'use strict';

var Bookshelf = require('../config/bookshelf');

require('./school');
var SchoolType = Bookshelf.Model.extend({
    tableName: 'school_types',
    
    schools: function() {
        return this.hasMany('School');
    }
});

module.exports = Bookshelf.model('SchoolType', SchoolType);
