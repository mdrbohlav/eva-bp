var Task = require('../../models/task');

module.exports = function(req, res, next) {
    if (typeof(req.get('x-secret')) == 'undefined' || req.get('x-secret') !== 'b378b7ccd64cdd0d0c7d3c2013cd6df5') {
        res.status(404);
        res.render('error', {
            page: 'error',
            message: 'Not Found',
            error: {
                status: 404
            }
        });
    } else {
        Task.where({ soft_deleted: false }).fetchAll().then(function(collection) {
            res.status(200).json(collection);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
};
