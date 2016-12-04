var TaskType = require('../../models/task_type');

module.exports = function(req, res, next) {
    var taskType = new TaskType({ id: req.params.taskTypeId * 1 });

    taskType.destroy().then(function(model) {
        res.status(200).json({ success: true });
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
