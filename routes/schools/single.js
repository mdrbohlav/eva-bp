var School = require('../../models/school');

module.exports = function(req, res, next) {
    var school = new School({ id: req.params.schoolId * 1 });

    school.fetch().then(function(model) {
        res.status(200).json(model);
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
