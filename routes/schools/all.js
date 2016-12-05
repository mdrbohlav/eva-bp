var School = require('../../models/school');

module.exports = function(req, res, next) {
    School.where({ soft_deleted: false }).fetchAll().then(function(collection) {
        collection.load(['type', 'region']).then(function(loadedCollection) {
            res.status(200).json(loadedCollection);
        });
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
