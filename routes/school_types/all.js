var SchoolType = require('../../models/school_type');

module.exports = function(req, res, next) {
    SchoolType.where({ soft_deleted: false }).fetchAll().then(function(collection) {
        res.status(200).json(collection);
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
