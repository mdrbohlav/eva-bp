var TaskType = require('../../models/task_type');
var types = require('../../helpers/task_types').data;

module.exports = function(req, res, next) {
    var cnt = 0;

    for (var i = 0; i < types.length; i++) {
        var taskType = new TaskType({ name: types[i] });

        taskType.save().then(function(model) {
            if (++cnt === types.length) {
                res.status(200).json({ success: true });
            }
        }).catch(function(error) {
            console.log(error)
        });
    }
};
