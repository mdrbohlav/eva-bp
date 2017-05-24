var Task = require('../../models/task');

module.exports = function(req, res, next) {
    if (typeof(req.get('x-secret')) == 'undefined' || req.get('x-secret') !== 'b4fc9dcf64630ef662b45d0377d78960') {
        res.status(404).render('error', {
            page: 'error',
            message: 'Not Found',
            error: {
                status: 404
            }
        });
        return;
    }

    var iteration = req.query.iteration;

    if (!iteration || ['1', '2'].indexOf(iteration) < 0) {
      res.status(400).json({ success: false });
      return;
    }

    var list = require('../../helpers/tasks_' + iteration);
    var tasksSavedCnt = 0;

    for (var i = 0; i < list.data.length; i++) {
        var data = {
            task_type_id: i + 1,
            json_data: JSON.stringify(list.data[i])
        };

        Task.where({ id: i + 1 }).save(data, {
            patch: true
        }).then(function(model) {
            if (++tasksSavedCnt === list.data.length) {
                res.status(200).json({ success: true });
            }
        }).catch(function(error) {
            console.log(error);
        });
    }
};
