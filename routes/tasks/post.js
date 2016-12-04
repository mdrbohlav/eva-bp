var Task = require('../../models/task');

module.exports = function(req, res, next) {
    var params = ['name', 'type', 'data'],
        notFound = false;

    for (var i = 0; i < params.length; i++) {
        if (!(params[i] in req.body)) {
            notFound = true;
            break;
        }
    }

    if (notFound) {
        res.status(400).json({ 
            error: {
                code: 400,
                name: 'Bad Request'
            },
            message: 'Missing required parameter.'
        });
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
