var School = require('../../models/school');
var getMissingParametersJSON = require('../../helpers/getMissingParametersJSON');

module.exports = function(req, res, next) {
    var params = ['name', 'type', 'region'],
        notFound = [];

    for (var i = 0; i < params.length; i++) {
        if (!(params[i] in req.body)) {
            notFound.push(params[i]);
        }
    }

    if (notFound.length > 0) {
        res.status(400).json(getMissingParametersJSON(notFound));
    } else {
        var school = new School({
            name: req.body.name,
            school_type_id: req.body.type,
            school_region_id: req.body.region
        });

        school.save().then(function(model) {
            res.status(200).json(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
