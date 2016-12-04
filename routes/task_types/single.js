module.exports = function(req, res, next) {
    res.status(200).json({ title: 'get single task type id: ' + req.params.taskTypeId * 1 })
}
