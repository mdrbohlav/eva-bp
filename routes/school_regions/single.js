var SchoolRegion = require('../../models/school_region');

module.exports = function(req, res, next) {
    SchoolRegion.where({ id: req.params.schooRegionlId * 1 }).fetch().then(function(model) {
        res.status(200).json(model);
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
