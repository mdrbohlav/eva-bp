var Result = require('../../models/result');

module.exports = function(req, res, next) {
    Result.where('user_id', req.params.userId * 1).fetchAll().then(function(collection) {
        res.status(200).json(collection);
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
