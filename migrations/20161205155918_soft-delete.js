exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('school_types', function(table) {
            table.boolean('soft_deleted').defaultTo(false);
        }),

        knex.schema.table('school_regions', function(table) {
            table.boolean('soft_deleted').defaultTo(false);
        }),

        knex.schema.table('schools', function(table) {
            table.boolean('soft_deleted').defaultTo(false);
        }),

        knex.schema.table('task_types', function(table) {
            table.boolean('soft_deleted').defaultTo(false);
        }),

        knex.schema.table('tasks', function(table) {
            table.boolean('soft_deleted').defaultTo(false);
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        
        knex.schema.table('school_types', function(table) {
            table.dropColumn('soft_deleted');
        }),

        knex.schema.table('school_regions', function(table) {
            table.dropColumn('soft_deleted');
        }),

        knex.schema.table('schools', function(table) {
            table.dropColumn('soft_deleted');
        }),

        knex.schema.table('task_types', function(table) {
            table.dropColumn('soft_deleted');
        }),

        knex.schema.table('tasks', function(table) {
            table.dropColumn('soft_deleted');
        })
    ])
};
