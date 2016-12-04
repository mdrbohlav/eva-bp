exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.dropTable('school_specializations')
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([

        knex.schema.createTable('school_specializations', function(table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        })
    ])
};
