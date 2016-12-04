module.exports = function(req, res, next) {
    res.status(200).json({ title: 'get single user id: ' + req.params.userId * 1 })
}
