var User = require('../../models/user');

module.exports = function(req, res, next) {
    if (typeof(req.get('x-power-secret')) == 'undefined' || req.get('x-power-secret') !== 'b5b5ecfaea315d6abc207a7034bdd118') {
        res.status(404);
        res.render('error', {
            page: 'error',
            message: 'Not Found',
            error: {
                status: 404
            }
        });
    } else {
        User.fetchAll().then(function(collection) {
            collection.load(['school', 'results']).then(function(loadedCollection) {
                res.status(200).json(loadedCollection);
            });
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
};
