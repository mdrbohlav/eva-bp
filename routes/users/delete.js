var User = require('../../models/user');

module.exports = function(req, res, next) {
    User.where({ id: req.params.userId * 1 }).destroy().then(function(model) {
        res.status(200).json({ success: true });
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
