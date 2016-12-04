var TaskType = require('../../models/task_type');

module.exports = function(req, res, next) {
    TaskType.where({ id: req.params.taskTypeId * 1 }).fetch().then(function(model) {
        res.status(200).json(model);
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
