const express = require('express');

const router = express.Router();

const { User } = require("../db/models/user.model");

// -------------- BASIC REST API ------------------

// Get a full list of users
router.get('/', (req, res) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((err) => {
        res.send(err);
    });
});

//Get user with specified MongoDB id (_id)
router.get('/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    }).then((userDoc) => {
        res.send(userDoc);
    }).catch((err) => {
        res.send(err);
    });
});

//Add dish do the database
router.post('/', (req, res) => {
    let nick = req.body.nick;
    let newUser = new User({
        nick
    });
    newUser.save().then((userDoc) => {
        res.send(userDoc);
    });
});

//Delete review with given id
router.delete('/:id', (req, res) => {
    User.findOneAndRemove({
        _id:req.params.id
    }).then((removedUserDoc) => {
        res.send(removedUserDoc);
    });
});

// -------------- PROPER REST API ------------------

module.exports = router;