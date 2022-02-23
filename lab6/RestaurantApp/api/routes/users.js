const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const { User } = require("../db/models/user.model");

function getMongoId(id) {
    const mongoose = require('mongoose');
    return new mongoose.Types.ObjectId(id);
}

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

//Get user by nick
router.get('/getUserByNick/:nick', (req, res) => {
    User.findOne({
        'nick': req.params.nick
    }).then((userDoc) => {
        res.send(userDoc);
    }).catch((err) => {
        res.send(err);
    });
});

//Add user do the database
router.post('/', (req, res) => {
    let nick = req.body.nick;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    let newUser = new User({
        nick,
        email,
        password,
        role
    });
    newUser.save().then((userDoc) => {
        res.send(userDoc);
    });
});

//Delete user with given id
router.delete('/:id', (req, res) => {
    User.findOneAndRemove({
        _id:req.params.id
    }).then((removedUserDoc) => {
        res.send(removedUserDoc);
    });
});

//Patch user with given id
router.patch('/patchWithId/:id', (req, res) => {
    User.findOneAndUpdate({_id:req.params.id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

//Patch user with given nick
router.patch('/patchWithNick/:nick', (req, res) => {
    User.findOneAndUpdate({'nick':req.params.nick}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

//Patch user with given mail
router.patch('/patchWithMail/:email', (req, res) => {
    User.findOneAndUpdate({'email':req.params.email}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

// -------------- PROPER REST API ------------------

//Get user role by nick
router.get('/getUserRoleByNick/:nick', (req, res) => {
    User.aggregate([
        { $match : { 'nick' : req.params.nick}},
        { $project: { 'role': '$role', _id : 0 }}
    ]).then((userDoc) => {
        res.send(userDoc[0].role);
    }).catch((err) => {
        res.send(err);
    });
});

//Get user role by mongo _id
router.get('/getUserRole/:id', (req, res) => {
    User.aggregate([
        { $match : { '_id' : getMongoId(req.params.id) }},
        { $project: { 'role': '$role', _id : 0 }}
    ]).then((userDoc) => {
        res.send(userDoc[0].role);
    }).catch((err) => {
        res.send(err);
    });
});

//Get all users' roles
router.get('/getUsersData/:param', (req, res) => {
    User.aggregate([
        { $project: { 'role': '$role', _id : 0, 'email': '$email', 'nick': '$nick' }}
    ]).then((userDoc) => {
        res.send(userDoc);
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router;