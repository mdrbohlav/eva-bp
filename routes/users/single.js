var User = require('../../models/user');

module.exports = function(req, res, next) {
    User.where({ id: req.params.userId * 1 }).fetch().then(function(model) {
        model.load(['school', 'results']).then(function(loadedModel) {
            res.status(200).json(loadedModel);
        });
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
