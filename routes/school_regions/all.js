var SchoolRegion = require('../../models/school_region');

module.exports = function(req, res, next) {
    SchoolRegion.fetchAll().then(function(collection) {
        res.status(200).json(collection);
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
