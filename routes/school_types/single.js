module.exports = function(req, res, next) {
    res.status(200).json({ title: 'get single school type id: ' + req.params.schoolTypeId * 1 })
}
