const express = require('express');
const router = express.Router();
const passport = require('passport');


module.exports = function (users) {
    router.post('/login', async (req, res, next) => {
        try {
            passport.authenticate('local', async (err, user, info) => {

                if (err) {
                    console.error('Error during login:', err);
                    res.status(500).json({ error: 'An error occurred during login' }).send();
                }

                if (!user) {
                    res.status(401).json({ error: info }).send();
                    return;
                }

                req.login(user, loginErr => {
                    if (loginErr) {
                        console.error('Error during login:', loginErr);
                        res.status(500).json({ error: 'An error occurred during login' });
                    }

                    // Return a success message
                    res.status(200).json({ message: 'Login successful' }).send();
                });

            })(req, res, next);
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'An error occurred during login' }).send();
        }
    });

    return router;
}
