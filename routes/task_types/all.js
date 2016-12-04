var TaskType = require('../../models/task_type');

module.exports = function(req, res, next) {
    TaskType.fetchAll().then(function(collection) {
        res.status(200).json(collection);
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
