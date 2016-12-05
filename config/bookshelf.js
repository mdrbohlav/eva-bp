var knex = require('./db');
var Bookshelf = require('bookshelf')(knex);
var cascadeDelete = require('bookshelf-cascade-delete');

Bookshelf.plugin('registry');
Bookshelf.plugin(cascadeDelete);

module.exports = Bookshelf;
