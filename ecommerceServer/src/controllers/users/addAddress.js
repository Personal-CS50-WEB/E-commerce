const express = require('express');
const router = express.Router();
const passport = require('passport');
const isAuthenticated = require('../../utils/users/authenticationCheck');

module.exports = function (users) {
    router.post('/add-address', isAuthenticated, async (req, res) => {
        try {
            const address  = req.body.address;

            // Retrieve the authenticated user's ID from the session
            const userId = req.user._id;

            // Update the user's address in the database
            const result = await users.updateOne(
                { _id: userId },
                { $set: { address: address } }
            );

            // Check if the update was successful
            if (result.modifiedCount === 0) {
                return res.status(500).json({ error: 'Failed to add address' });
            }

            return res.status(200).json({ message: 'Address added successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
    return router;
}
