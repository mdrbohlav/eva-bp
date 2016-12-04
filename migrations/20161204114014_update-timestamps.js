exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('schools', function(table) {
            table.dropTimestamps();
        }),

        knex.schema.table('users', function(table) {
            table.timestamps();
        }),

        knex.schema.table('results', function(table) {
            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('schools', function(table) {
            table.timestamps();
        }),

        knex.schema.table('users', function(table) {
            table.dropTimestamps();
        }),

        knex.schema.table('results', function(table) {
            table.dropTimestamps();
        })
    ])
};
