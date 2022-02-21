const express = require('express');
const app = express();

const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { Dish } = require("./db/models/dish.model");

const { NativeDate } = require('mongoose');


// Get a full list of dishes
app.get('/dishes', (req, res) => {
    Dish.find().then((dishes) => {
        res.send(dishes);
    }).catch((err) => {
        res.send(err);
    });
});

//Get dish with specified id
app.get('/detail/:id', (req, res) => {
    Dish.findOne({
        _id: req.params.id
    }).then((dishDoc) => {
        res.send(dishDoc);
    }).catch((err) => {
        res.send(err);
    });
});

//Add dish do the database
app.post('/dishes', (req, res) => {
    let name = req.body.name;
    let cuisine = req.body.cuisine;
    let category = req.body.category;
    let ingredients = req.body.ingredients;
    let maxDailyAmount = req.body.maxDailyAmount;
    let price = req.body.price;
    let description = req.body.description;
    let photos = req.body.photos;
    console.log("NAME: ", name)
    let newDish = new Dish({
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

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});