var User = require('../../models/user');

module.exports = function(req, res, next) {
    User.fetchAll().then(function(collection) {
        collection.load(['school', 'results']).then(function(loadedCollection) {
            res.status(200).json(loadedCollection);
        });
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
