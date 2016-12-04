var TaskType = require('../../models/task_type');

module.exports = function(req, res, next) {
    if (!('name' in req.body)) {
        res.status(400).json({ 
            error: {
                code: 400,
                name: 'Bad Request'
            },
            message: 'Missing required parameter.'
        });
    } else {
        taskType = new TaskType({ name: req.body.name });

        taskType.save().then(function(model) {
            res.status(200).json(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
