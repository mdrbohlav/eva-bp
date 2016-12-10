var pug = require('pug');

var Task = require('../../models/task');

module.exports = function(req, res, next) {
    Task.where({ id: req.params.taskId * 1 }).fetch().then(function(model) {
        var html = pug.renderFile(__dirname + '/../../views/tasks/' + req.params.taskId + '.pug', {
            data: model
        });

        res.status(200).send(html);
    }).catch(function(error) {
        res.status(400).json(error);
    });
}
