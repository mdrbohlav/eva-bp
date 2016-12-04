module.exports = function(req, res, next) {
    res.status(200).json({ title: 'get single school specialization id: ' + req.params.schoolSpecializationId * 1 })
}
