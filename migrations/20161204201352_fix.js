exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('schools', function(table) {
            table.dropColumn('sex');
            table.enu('level', ['vysoká škola', 'vyšší odborná škola']);
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
