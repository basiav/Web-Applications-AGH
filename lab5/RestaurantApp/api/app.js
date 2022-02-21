const express = require('express');
const app = express();

const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

const { Dish } = require("./db/models/dish.model");
const { User } = require("./db/models/user.model");
const { Review } = require("./db/models/review.model");

const { NativeDate } = require('mongoose');


// Import routes
const dishesRoute = require('./routes/dishes');
app.use('/dishes', dishesRoute);
const reviewsRoute = require('./routes/reviews');
app.use('/reviews', reviewsRoute);
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});