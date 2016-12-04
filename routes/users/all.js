var User = require('../../models/user');

module.exports = function(req, res, next) {
    User.fetchAll().then(function(collection) {
        res.status(200).json(collection);
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
