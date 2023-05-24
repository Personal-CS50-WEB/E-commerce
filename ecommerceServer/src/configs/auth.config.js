const path = require('path');
const passport = require('passport');

// Serialize and deserialize user for session management
module.exports = function (db) {
    const users = db.collection('users');
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    passport.deserializeUser((email, done) => {
        const user = users.find(user => user.email === email);
        done(null, user);
    });
    require(path.join(__dirname, 'local-strategy'));
}