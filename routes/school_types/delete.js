var SchoolType = require('../../models/school_type');

module.exports = function(req, res, next) {
    var schoolType = new SchoolType({ id: req.params.schoolTypeId * 1 });

    schoolType.destroy().then(function(model) {
        res.status(200).json({ success: true });
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
