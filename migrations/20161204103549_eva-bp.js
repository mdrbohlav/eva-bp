exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.createTable('school_types', function(table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),

        knex.schema.createTable('school_regions', function(table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),

        knex.schema.createTable('schools', function(table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.enu('level', ['vysoká škola', 'vyšší odborná škola']);
            table.integer('school_type_id')
                .references('id')
                .inTable('school_types');
            table.integer('school_region_id')
                .references('id')
                .inTable('school_regions');
        }),

        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.integer('age').notNullable();
            table.enu('sex', ['muž', 'žena']);
            table.integer('school_id')
                .references('id')
                .inTable('schools');
            table.timestamps();
        }),

        knex.schema.createTable('task_types', function(table) {
            table.increments('id').primary();
            table.string('name').notNullable();
        }),

        knex.schema.createTable('tasks', function(table) {
            table.increments('id').primary();
            table.json('json_data').notNullable();
            table.integer('task_type_id')
                .notNullable()
                .references('id')
                .inTable('task_types');
        }),

        knex.schema.createTable('results', function(table) {
            table.json('json_answer').notNullable();
            table.integer('user_id')
                .references('id')
                .inTable('users');
            table.integer('task_id')
                .references('id')
                .inTable('tasks');
            table.primary(['user_id', 'task_id']);
            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('school_types'),
        knex.schema.dropTable('school_regions'),
        knex.schema.dropTable('schools'),
        knex.schema.dropTable('users'),
        knex.schema.dropTable('task_types'),
        knex.schema.dropTable('tasks'),
        knex.schema.dropTable('results')
    ])
};
