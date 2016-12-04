var School = require('../../models/school');

module.exports = function(req, res, next) {
    School.fetchAll().then(function(collection) {
        collection.load(['type', 'region', 'specialization']).then(function(loadedCollection) {
            res.status(200).json(loadedCollection);
        });
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
