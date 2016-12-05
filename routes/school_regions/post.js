var SchoolRegion = require('../../models/school_region');
var getMissingParametersJSON = require('../../helpers/getMissingParametersJSON');

module.exports = function(req, res, next) {
    if (!('name' in req.body)) {
        res.status(400).json(getMissingParametersJSON(['name']));
    } else {
        schoolRegion = new SchoolRegion({ name: req.body.name });

        schoolRegion.save().then(function(model) {
            res.status(200).json(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
