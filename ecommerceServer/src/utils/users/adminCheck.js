function adminCheck(req, res, next) {
    console.log(req.user)
    // Check if user is an admin
    if (!req.user || !req.user.role || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    } else {
        next()
    }

}
module.exports = adminCheck;