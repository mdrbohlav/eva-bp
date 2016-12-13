var Task = require('../../models/task');

module.exports = function(req, res, next) {
    if (typeof(req.get('x-secret')) == 'undefined' || req.get('x-secret') !== '210860a8b34861a4cc4e4974ddfab83b') {
        res.status(404);
        res.render('error', {
            page: 'error',
            message: 'Not Found',
            error: {
                status: 404
            }
        });
    } else {
        var params = ['task_type_id', 'json_data'],
            data = {};

        if ('task_type_id' in req.body) {
            data.task_type_id = req.body.task_type_id;
        }

        if ('json_data' in req.body) {
            data.json_data = JSON.stringify(req.body.json_data);
        }

        Task.where({ id: req.params.taskId * 1 }).save(data, {
            patch: true
        }).then(function(model) {
            res.status(200).json(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
