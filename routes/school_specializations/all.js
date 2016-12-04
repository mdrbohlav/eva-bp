var SchoolSpecialization = require('../../models/school_specialization');

module.exports = function(req, res, next) {
    SchoolSpecialization.fetchAll().then(function(collection) {
        res.status(200).json(collection);
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
