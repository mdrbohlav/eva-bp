var Task = require('../../models/task');

module.exports = function(req, res, next) {
    var tasksSavedCnt = 0;
    var iteration = req.query.iteration;

    if (!iteration || ['1', '2'].indexOf(iteration) < 0) {
      res.status(400).json({ success: false });
      return;
    }

    var list = require('../../helpers/tasks_' + iteration);

    for (var i = 0; i < list.data.length; i++) {
        var task = new Task({
            task_type_id: i + 1,
            json_data: JSON.stringify(list.data[i])
        });

        console.log(task);

        // task.save().then(function(model) {
        //     if (++tasksSavedCnt === list.data.length) {
        //         res.status(200).json({ success: true });
        //     }
        // }).catch(function(error) {
        //     console.log(error);
        // });
    }
};
