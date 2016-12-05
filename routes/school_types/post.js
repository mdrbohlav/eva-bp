var SchoolType = require('../../models/school_type');
var getMissingParametersJSON = require('../../helpers/getMissingParametersJSON');

module.exports = function(req, res, next) {
    if (!('name' in req.body)) {
        res.status(400).json(getMissingParametersJSON(['name']));
    } else {
        schoolType = new SchoolType({ name: req.body.name });

        schoolType.save().then(function(model) {
            res.status(200).json(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
