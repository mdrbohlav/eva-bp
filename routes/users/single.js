var User = require('../../models/user');

module.exports = function(req, res, next) {
    User.where({ id: req.params.userId * 1 }).load(['school', 'results']).fetch().then(function(model) {
        res.status(200).json(model);
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
