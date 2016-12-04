module.exports = function(req, res, next) {
    res.status(200).json({ title: 'get single school region id: ' + req.params.schoolRegionId * 1 })
}
