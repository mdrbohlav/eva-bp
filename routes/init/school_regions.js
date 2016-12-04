var SchoolRegion = require('../../models/school_region');
var regions = require('../../helpers/school_regions').data;

module.exports = function(req, res, next) {
    for (var i = 0; i < regions.length; i++) {
        schoolRegion = new SchoolRegion({ name: regions[i] });

        schoolRegion.save().then(function(model) {
            if (model.id === regions.length) {
                res.status(200).json({ success: true });
            }
        }).catch(function(error) {
            console.log(error)
        });
    }
};
