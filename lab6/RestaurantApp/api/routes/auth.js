const express = require('express');

const router = express.Router();

// Password hashing
const bcrypt = require('bcryptjs');

// JsonWebToken
const jwt = require('jsonwebtoken');

const { User } = require("../db/models/user.model");
const { registerValidation, loginValidation } = require('../validation');

// REGISTER user in the database /auth/register
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
        res.send({user: newUser._id});
    } catch (err) {
        res.status(400).send(err);
    }
});


// LOGIN user /auth/login
router.post('/login', async (req, res) => {
    // Validate data of the user-to-be
    try {
        const value = await loginValidation(req.body);
        console.log("[loginValidation] value: ", value);
    }
    catch (err) {
        console.log("[loginValidation] ERROR: ", err);
        return res.status(400).send(err.details[0].message);
    }

    // If the email doesn't exist in the database, it means it's invalid
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("The email doesn't exist");

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("The password is incorrect");

    res.send("Logged in!");
});

module.exports = router;