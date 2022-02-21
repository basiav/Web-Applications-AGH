const express = require('express');

const router = express.Router();

const { Star } = require("../db/models/star.model");

// -------------- BASIC REST API ------------------

// Get a full list of stars
router.get('/', (req, res) => {
    Star.find().then((reviews) => {
        res.send(reviews);
    }).catch((err) => {
        res.send(err);
    });
});

//Get stars with specified MongoDB id (_id)
router.get('/:id', (req, res) => {
    Star.findOne({
        _id: req.params.id
    }).then((dishDoc) => {
        res.send(dishDoc);
    }).catch((err) => {
        res.send(err);
    });
});

//Add stars do the database
router.post('/', (req, res) => {
    let dishId = req.body.dishId;
    let author = req.body.author;
    let stars = req.body.stars;
    let newStar = new Star({
        dishId,
        author,
        stars
    });
    newStar.save().then((starDoc) => {
        res.send(starDoc);
    });
});

//Delete stars with given id
router.delete('/:id', (req, res) => {
    Star.findOneAndRemove({
        _id:req.params.id
    }).then((removeStarsDoc) => {
        res.send(removeStarsDoc);
    });
});

// -------------- PROPER REST API FUNCTIONS ------------------

//Get avg stars for dish with a given MongoDB _id
router.get('/avgStarsByDish_id/:id', (req, res) => {
    const mongoose = require("mongoose");
    Star.aggregate([
        { $group: { _id: "$dishId", avgStars: { $avg: "$stars" } } },
        { $match : { _id : new mongoose.Types.ObjectId(req.params.id)}},
        { $project: { _id: 0 }}
    ]).then((starDoc) => {
        res.send(starDoc);
    }).catch((err) => {
        res.send(err);
    });
});

//Get avg stars for dish with a given restaurant dish id
router.get('/avgStarsByDishId/:id', (req, res) => {
    const mongoose = require("mongoose");
    Star.aggregate([
        { $group: { _id: "$dishId", avgStars: { $avg: "$stars" } } },
        { $lookup: {
            from: 'dishes', 
            localField: '_id', foreignField: '_id', 
            as: 'dish'
       }},
       { $unwind: '$dish'},
       { $project: { "avgStars" : "$avgStars", "dishId": "$dish.id", _id : 0}},
       { $match : { 'dishId' : parseInt(req.params.id) }},
       { $project: { 'avgStars': 1 }}
    ]).then((starDoc) => {
        res.send(starDoc);
    }).catch((err) => {
        res.send(err);
    });
});

//Get number of stars for a dish with given restaurant dish id
router.get('/totalStarsByDishId/:id', (req, res) => {
    const mongoose = require("mongoose");
    Star.aggregate([
        { $group: { _id: "$dishId", starsCount: { $sum: 1 } } }, 
        { $lookup: {
            from: 'dishes', 
            localField: '_id', foreignField: '_id', 
            as: 'dish'
       }},
       { $unwind: '$dish'},
       { $project: { "starsCount" : "$starsCount", "dishId": "$dish.id"}},
       { $match : { 'dishId' : parseInt(req.params.id) }},
       { $project: { starsCount: 1, _id : 0 }}
    ]).then((starsDoc) => {
        res.send(starsDoc);
    }).catch((err) => {
        res.send(err);
    });
});




module.exports = router;