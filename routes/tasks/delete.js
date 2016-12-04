var Task = require('../../models/task');

module.exports = function(req, res, next) {
    Task.where({ id: req.params.taskId * 1 }).destroy().then(function(model) {
        res.status(200).json({ success: true });
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
