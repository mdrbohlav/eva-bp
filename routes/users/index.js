var users = require('express').Router();
var all = require('./all');
var single = require('./single');
var results = require('./results');
var del = require('./delete');

var User = require('../../models/user');

users.param('userId', function(req, res, next, value) {
    var user = User.where({ id: value * 1 });

    user.count('id').then(function(count) {
        if (count > 0) {
            next();
        } else {
            res.status(404).json({ 
                error: {
                    code: 404,
                    name: 'Not Found'
                },
                message: 'Invalid user ID.'
            });
        }
    }).catch(function(error) {
        res.status(400).json(error);
    });
});

users.get('/', all);
users.get('/:userId', single);
users.use('/:userId/results', results);
users.delete('/:userId', del);

module.exports = users;
