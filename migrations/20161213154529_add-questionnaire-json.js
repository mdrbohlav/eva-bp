exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('users', function(table) {
            table.json('json_questionnaire').defaultTo('{}').notNullable();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        
        knex.schema.table('users', function(table) {
            table.dropColumn('json_questionnaire');
        })
    ])
};
