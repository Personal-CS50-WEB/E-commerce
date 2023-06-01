const { ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const managerCheck = require('../../utils/users/managerCheck');

module.exports = function (users) {
    router.post('/admin-role', managerCheck, async (req, res) => {
        try {
            const userEmail = req.body.email;

            // Find the user to whom the admin role will be added
            const user = await users.findOne({ email: userEmail });

            // If the user doesn't exist, return an error
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Check if the user already has the admin role
            if (user.role && user.role.admin) {
                return res.status(400).json({ error: 'User already has the admin role' });
            }

            // Check if the user's role is "manager"
            if (user.role && user.role.manager) {
                return res.status(400).json({ error: 'Cannot add admin role to a manager' });
            }
            // Update the user's role to admin
            await users.updateOne({ _id: user._id }, { $set: { role: 'admin' } });

            return res.status(200).json({ message: 'Admin role added successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
}

