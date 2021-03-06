var School = require('../../models/school');

module.exports = function(req, res, next) {
    School.where({ id: req.params.schoolId * 1 }).save({ 
        soft_deleted: true
    }, { 
        patch: true 
    }).then(function(model) {
        res.status(200).json({ success: true });
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
