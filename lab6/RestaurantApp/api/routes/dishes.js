const express = require('express');

const router = express.Router();

const { Dish } = require("../db/models/dish.model");

// -------------- BASIC REST API ------------------

// Get a full list of dishes
router.get('/', (req, res) => {
    Dish.find().then((dishes) => {
        res.send(dishes);
    }).catch((err) => {
        res.send(err);
    });
});

//Get dish with specified restaurant dish id
router.get('/:id', (req, res) => {
    Dish.findOne({
        'id': req.params.id
    }).then((dishDoc) => {
        res.send(dishDoc);
    }).catch((err) => {
        res.send(err);
    });
});

// Get MongoDB dish _id with given restaurant dish id
router.get('/_id/:id', (req, res) => {
    const mongoose = require("mongoose");
    Dish.aggregate([
        { $match : { 'id' : parseInt(req.params.id)}},
        { $project: { '_id': '$_id' }}
    ]).then((dishDoc) => {
        res.send(dishDoc);
    }).catch((err) => {
        res.send(err);
    });
});

// Get dish with given Mongo dish _id
router.get('/getWith_id/:id', (req, res) => {
    const mongoose = require("mongoose");
    Dish.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id)
    }).then((dishDoc) => {
        res.send(dishDoc);
    }).catch((err) => {
        res.send(err);
    });
});

//Add dish do the database
router.post('/', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let cuisine = req.body.cuisine;
    let category = req.body.category;
    let ingredients = req.body.ingredients;
    let maxDailyAmount = req.body.maxDailyAmount;
    let price = req.body.price;
    let description = req.body.description;
    let photos = req.body.photos;
    let newDish = new Dish({
        id,
        name,
        cuisine,
        category,
        ingredients,
        maxDailyAmount,
        price,
        description,
        photos
    });
    newDish.save().then((dishDoc) => {
        res.send(dishDoc);
    });
});

//Delete dish with given restaurant id
router.delete('/:id', (req, res) => {
    Dish.findOneAndRemove({
        'id': req.params.id
    }).then((removedDishDoc) => {
        res.send(removedDishDoc);
    });
});

//Delete dish with given MongoDB _id
router.delete('/_id/:id', (req, res) => {
    Dish.findOneAndRemove({
        _id: req.params.id
    }).then((removedDishDoc) => {
        res.send(removedDishDoc);
    });
});

// -------------- PROPER REST API ------------------

module.exports = router;