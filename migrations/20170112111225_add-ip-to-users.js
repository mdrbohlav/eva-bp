exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('users', function(table) {
            table.string('ip_address');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        
        knex.schema.table('users', function(table) {
            table.dropColumn('ip_address');
        })
    ])
};
