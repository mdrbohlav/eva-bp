exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('schools', function(table) {
            table.dropColumn('school_specialization_id');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('schools', function(table) {
            table.integer('school_specialization_id')
                .references('id')
                .inTable('school_specializations');
        })
    ])
};
