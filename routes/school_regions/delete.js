var SchoolRegion = require('../../models/school_region');

module.exports = function(req, res, next) {
    SchoolRegion.where({ id: req.params.schoolRegionId * 1 }).save({ 
        soft_deleted: true
    }, { 
        patch: true 
    }).then(function(model) {
        res.status(200).json({ success: true });
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
