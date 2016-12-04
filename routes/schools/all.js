module.exports = function(req, res, next) {
    res.status(200).json({ title: 'get all schools' });
};
