'use strict';

var Bookshelf = require('../config/bookshelf');

require('./school');
var SchoolRegion = Bookshelf.Model.extend({
    tableName: 'school_regions',
    
    schools: function() {
        return this.hasMany('School');
    }
});

module.exports = Bookshelf.model('SchoolRegion', SchoolRegion);
