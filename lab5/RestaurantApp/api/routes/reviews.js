const express = require('express');

const router = express.Router();

const { Review } = require("../db/models/review.model");

// -------------- BASIC REST API ------------------

// Get a full list of reviews
router.get('/', (req, res) => {
    Review.find().then((reviews) => {
        res.send(reviews);
    }).catch((err) => {
        res.send(err);
    });
});

//Get review with specified MongoDB id (_id)
router.get('/:id', (req, res) => {
    Dish.findOne({
        _id: req.params.id
    }).then((dishDoc) => {
        res.send(dishDoc);
    }).catch((err) => {
        res.send(err);
    });
});

//Add review do the database
router.post('/', (req, res) => {
    let dishId = req.body.dishId;
    let author = req.body.author;
    let reviewHead = req.body.reviewHead;
    let reviewBody = req.body.reviewBody;
    let purchaseDate = req.body.purchaseDate;
    let newReview = new Review({
        dishId,
        author,
        reviewHead,
        reviewBody,
        purchaseDate
    });
    newReview.save().then((reviewDoc) => {
        res.send(reviewDoc);
    });
});

//Delete review with given id
router.delete('/:id', (req, res) => {
    Review.findOneAndRemove({
        _id:req.params.id
    }).then((removedReviewDoc) => {
        res.send(removedReviewDoc);
    });
});

// -------------- PROPER REST API FUNCTIONS ------------------

//Get number of reviews for a dish with given restaurant dish id
router.get('/totalStarsByDishId/:id', (req, res) => {
    const mongoose = require("mongoose");
    Review.aggregate([
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
    ]).then((reviewDoc) => {
        res.send(reviewDoc);
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router;