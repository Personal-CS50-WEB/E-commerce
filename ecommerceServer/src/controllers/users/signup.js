const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = function (users) {

    router.post('/signup', async (req, res) => {
        try {
            const { email, password, username } = req.body;

            // Check if email already exists in the database
            const existingUser = await users.findOne({ email: req.body.email })
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
            const result = await users.insertOne(newUser);
            const insertedId = await result.insertedId;
            const projection = { _id: 1, username: 1, email: 1 };
            // Retrieve the inserted data by querying the collection
            const insertedData = await users.findOne({ _id: insertedId }, { projection });

            res.send(insertedData);
        } catch (error) {
            // Handle any errors that occurred during signup
            console.error('Error during signup:', error);
            res.status(500).json({ error: 'An error occurred during signup' }).send();
        }
    });
    return router;
}
