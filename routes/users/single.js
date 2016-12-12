var User = require('../../models/user');

module.exports = function(req, res, next) {
    if (typeof(req.get('x-power-secret')) == 'undefined' || req.get('x-power-secret') !== '3e9b332c6df33ca98910421363ec1b03') {
        res.status(404);
        res.render('error', {
            page: 'error',
            message: 'Not Found',
            error: {
                status: 404
            }
        });
    } else {
        User.where({ id: req.params.userId * 1 }).fetch().then(function(model) {
            model.load(['school', 'results']).then(function(loadedModel) {
                res.status(200).json(loadedModel);
            });
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
