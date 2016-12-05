var Promise = require('bluebird');
var Bookshelf = require('../config/bookshelf');

var User = require('../models/user');
var Result = require('../models/result');

module.exports = function(req, res, next) {
    var params = ['age', 'sex', 'school_id', 'results'],
        notFound = [];

    for (var i = 0; i < params.length; i++) {
        if (!(params[i] in req.body)) {
            notFound.push(params[i]);
        }
    }

    if (notFound.length > 0) {
        res.status(400).json(getMissingParametersJSON(notFound));
    } else {
        Bookshelf.transaction(function(t) {        
            return new User({
                age: req.body.age * 1,
                sex: req.body.sex,
                school_id: req.body.school_id
            }).save(null, {
                transacting: t
            }).tap(function(model) {
                var results = []

                for (var i = 0; i < req.body.results.length; i++) {
                    results.push({
                        task_id: req.body.results[i].id * 1,
                        json_answer: JSON.stringify(req.body.results[i].data)
                    });
                }

                return Promise.map(results, function(info) {
                    // validation maybe?
                    return new Result(info).save({ 'user_id': model.id }, { transacting: t });
                });
            });
        }).then(function(model) {
            res.status(200).json({ success: true });
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
};
