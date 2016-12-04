exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('schools', function(table) {
            table.enu('sex', ['vysoká škola', 'vyšší odborná škola']);
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('schools', function(table) {
            table.dropColumn('level');
        })
    ])
};
