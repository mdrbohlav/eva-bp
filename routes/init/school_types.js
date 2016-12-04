var SchoolType = require('../../models/school_type');
var types = require('../../helpers/school_types').data;

module.exports = function(req, res, next) {
    for (var i = 0; i < types.length; i++) {
        schoolType = new SchoolType({ name: types[i] });

        schoolType.save().then(function(model) {
            if (model.id === types.length) {
                res.status(200).json({ success: true });
            }
        }).catch(function(error) {
            console.log(error)
        });
    }
};
