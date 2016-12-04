var School = require('../../models/school');

module.exports = function(req, res, next) {
    School.fetchAll().then(function(collection) {
        res.status(200).json(collection);
    }).catch(function(error) {
        res.status(400).json(error);
    });
};
