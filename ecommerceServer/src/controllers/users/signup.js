const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = function (users) {
    router.post('/signup', async (req, res) => {
        try {
            const { email, password, username } = req.body;
    
            // Check if email already exists in the database
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                res.status(409).json({ error: 'Email already exists' }).send();
            }
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new user object
            const newUser = {
                email,
                password: hashedPassword,
                username
            };
    
            // Store the user object in the database
            users.push(newUser);
    
            res.status(200).json({ message: 'User created successfully' }).send();
        } catch (error) {
            // Handle any errors that occurred during signup
            console.error('Error during signup:', error);
            res.status(500).json({ error: 'An error occurred during signup' }).send();
        }
    });
        return router;
}
