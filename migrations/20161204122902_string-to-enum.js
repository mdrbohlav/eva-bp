
exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('users', function(table) {
            table.dropColumn('sex');
        })
    ])  
};

exports.down = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('users', function(table) {
            table.string('sex');
        })
    ]) 
};
