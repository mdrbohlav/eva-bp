var School = require('../../models/school');
var u = require('../../config/vysoke_skoly');

module.exports = function(req, res, next) {
    var params = ['name', 'type', 'region'],
        notFound = false;

    for (var i = 0; i < params.length; i++) {
        if (!(params[i] in req.body)) {
            notFound = true;
            break;
        }
    }

    if (notFound) {
        res.status(400).json({ 
            error: {
                code: 400,
                name: 'Bad Request'
            },
            message: 'Missing required parameter.'
        });
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
