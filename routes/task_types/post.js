var TaskType = require('../../models/task_type');
var getMissingParametersJSON = require('../../helpers/getMissingParametersJSON');

module.exports = function(req, res, next) {
    if (!('name' in req.body)) {
        res.status(400).json(getMissingParametersJSON(['name']));
    } else {
        taskType = new TaskType({ name: req.body.name });

        taskType.save().then(function(model) {
            res.status(200).json(model);
        }).catch(function(error) {
            res.status(400).json(error);
        });
    }
}
