var SchoolType = require('../../models/school_type');

module.exports = function(req, res, next) {
    SchoolType.where({ id: req.params.schoolTypeId * 1 }).fetch().then(function(model) {
        res.status(200).json(model);
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
