var Task = require('../../models/task');

module.exports = function(req, res, next) {
    if (typeof(req.get('x-secret')) == 'undefined' || req.get('x-secret') !== '54c3c3db0b3a8c92479f6cabe3bac98b') {
        res.status(404);
        res.render('error', {
            page: 'error',
            message: 'Not Found',
            error: {
                status: 404
            }
        });
    } else {
        Task.where({ id: req.params.taskId * 1 }).fetch().then(function(model) {
            res.status(200).json(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
