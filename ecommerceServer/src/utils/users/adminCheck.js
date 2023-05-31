function adminCheck(req, res, next) {
    console.log(req.user)
    // Check if user is an admin
    if (!req.user || req.user.role !== 'admin') {
        next();
    } else {
        res.redirect('/login');
    }

}
module.exports = adminCheck;