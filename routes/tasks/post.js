var Task = require('../../models/task');
var getMissingParametersJSON = require('../../helpers/getMissingParametersJSON');

module.exports = function(req, res, next) {
    var params = ['name', 'type', 'data'],
        notFound = [];

    for (var i = 0; i < params.length; i++) {
        if (!(params[i] in req.body)) {
            notFound.push(params[i]);
        }
    }

    if (notFound.length > 0) {
        res.status(400).json(getMissingParametersJSON(notFound));
    } else {
        var task = new Task({
            name: req.body.name,
            task_type_id: req.body.type,
            json_data: req.body.data
        });

        task.save().then(function(model) {
            res.status(200).json(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
