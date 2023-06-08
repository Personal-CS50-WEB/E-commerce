const path = require('path');
const passport = require('passport');

// Serialize and deserialize user for session management
module.exports = function (db) {
    const users = db.collection('users');
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    passport.deserializeUser(async (email, done) => {
        const user = await users.findOne({ email: email });

        done(null, user);
    });
    require(path.join(__dirname, 'local-strategy'));
}