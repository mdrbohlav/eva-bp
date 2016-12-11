exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('users', function(table) {
            table.boolean('slept').defaultTo(false).notNullable();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        
        knex.schema.table('users', function(table) {
            table.dropColumn('slept');
        })
    ])
};
