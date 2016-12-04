var SchoolType = require('../../models/school_type');

module.exports = function(req, res, next) {
    var schoolType = new SchoolType({ id: req.params.schoolTypeId * 1 });

    schoolType.fetch().then(function(model) {
        res.status(200).json(model);
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
