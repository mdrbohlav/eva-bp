var School = require('../../models/school');

module.exports = function(req, res, next) {
    School.where({ id: req.params.schoolId * 1 }).load(['type', 'region', 'specialization']).fetch().then(function(model) {
        res.status(200).json(model);
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
