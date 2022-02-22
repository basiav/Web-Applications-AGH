const express = require('express');

const router = express.Router();

// Password hashing
const bcrypt = require('bcryptjs');

// JsonWebToken
const jwt = require('jsonwebtoken');

const { User } = require("../db/models/user.model");
const { registerValidation } = require('../validation');

//Add user do the database /auth/register
router.post('/register', async (req, res) => {
    // Validate data of the user-to-be
    try {
        const value = await registerValidation(req.body);
        console.log("[registerValidation] value: ", value);
    }
    catch (err) {
        console.log("[registerValidation] ERROR: ", err);
        return res.status(400).send(err.details[0].message);
    }

    // Checking if the nick and email exist in the db (we don't want that)
    const nickExists = await User.findOne({nick: req.body.nick});
    if (nickExists) return res.status(400).send('The nick already exists');
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('The email already exists');

    // Password hashing with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newUser = new User({
        nick: req.body.nick,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;