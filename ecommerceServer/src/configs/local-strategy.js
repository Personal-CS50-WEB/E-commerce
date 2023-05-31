const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(db){
    const users = db.collection('users');
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                // Check if email exists in the database
                const user = await users.findOne({email:email});
                if (!user) {
                    return done(null, false, { message: 'Email not found' });
                }

                // Compare the hashed password
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return done(null, false, { message: 'Incorrect password' });
                }
                // Authentication successful
                return done(null, user);
            } catch (error) {
                // Handle any errors that occurred during authentication
                return done(error);
            }
        })
    );
}
    