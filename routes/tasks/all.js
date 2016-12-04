var Task = require('../../models/task');

module.exports = function(req, res, next) {
    Task.fetchAll().then(function(collection) {
        res.status(200).json(collection);
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
