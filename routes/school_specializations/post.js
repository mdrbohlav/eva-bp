var SchoolSpecialization = require('../../models/school_specialization');

module.exports = function(req, res, next) {
    if (!('name' in req.body)) {
        res.status(400).json({ 
            error: {
                code: 400,
                name: 'Bad Request'
            },
            message: 'Missing required parameter.'
        });
    } else {
        schoolSpecialization = new SchoolSpecialization({ name: req.body.name });

        schoolSpecialization.save().then(function(model) {
            res.status(200).json(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
