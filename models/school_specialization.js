'use strict';

var Bookshelf = require('../config/bookshelf');

require('./school');
var SchoolSpecialization = Bookshelf.Model.extend({
    tableName: 'school_specializations',
    
    schools: function() {
        return this.hasMany('School');
    }
});

module.exports = Bookshelf.model('SchoolSpecialization', SchoolSpecialization);
