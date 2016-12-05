var Task = require('../../models/task');
var list = require('../../helpers/tasks');

module.exports = function(req, res, next) {
    tasksSavedCnt = 0;

    for (var i = 0; i < list.data.length; i++) {
        var name = list.data[i].name;
        var type = list.data[i].type;
        var region = list.data[i].region;

        var task = new Task({
            task_type_id: i + 1,
            json_data: list.data[i]
        });

        task.save().then(function(model) {
            if (++tasksSavedCnt === list.data.length) {
                res.status(200).json({ success: true });
            }
        }).catch(function(error) {
            console.log(error);
        });
    }
};
