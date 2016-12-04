var Task = require('../../models/task');

module.exports = function(req, res, next) {
    Task.where({ id: req.params.taskId * 1 }).fetch().then(function(model) {
        res.status(200).json(model);
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
