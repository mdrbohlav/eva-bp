module.exports = function(req, res, next) {
    res.status(200).json({ title: 'get single school id: ' + req.params.schoolId * 1 })
}
