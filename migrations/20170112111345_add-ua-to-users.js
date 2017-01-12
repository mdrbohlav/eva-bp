exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('users', function(table) {
            table.string('user_agent');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        
        knex.schema.table('users', function(table) {
            table.dropColumn('user_agent');
        })
    ])
};
