var School = require('../../models/school');

module.exports = function(req, res, next) {
    School.where({ id: req.params.schoolId * 1 }).fetch().then(function(model) {
        model.load(['type', 'region', 'specialization']).then(function(loadedModel) {
            res.status(200).json(loadedModel);
        });
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
