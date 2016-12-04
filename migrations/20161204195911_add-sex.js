
exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('users', function(table) {
            table.enu('sex', ['muž', 'žena']);
        })
    ])  
};

exports.down = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('users', function(table) {
            table.dropColumn('sex');
        })
    ])  
};
