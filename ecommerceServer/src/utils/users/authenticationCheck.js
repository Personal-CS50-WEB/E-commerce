function isAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
module.exports = isAuthenticated;