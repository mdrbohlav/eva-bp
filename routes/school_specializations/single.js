var SchoolSpecialization = require('../../models/school_specialization');

module.exports = function(req, res, next) {
    var schoolSpecialization = new SchoolSpecialization({ id: req.params.schoolSpecializationId * 1 });

    schoolSpecialization.fetch().then(function(model) {
        res.status(200).json(model);
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
