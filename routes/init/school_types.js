var SchoolType = require('../../models/school_type');
var types = require('../../helpers/school_types').data;

module.exports = function(req, res, next) {
    var cnt = 0;

    for (var i = 0; i < types.length; i++) {
        var schoolType = new SchoolType({ name: types[i] });

        schoolType.save().then(function(model) {
            if (++cnt === types.length) {
                res.status(200).json({ success: true });
            }
        }).catch(function(error) {
            console.log(error)
        });
    }
};
