
exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('users', function(table) {
            table.enu('sex', ['man', 'woman']);
        })
    ])  
};

exports.down = function(knex, Promise) {
    return Promise.all([

        knex.schema.table('users', function(table) {
            table.enu('sex', ['man', 'woman']);
        })
    ]) 
};
