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
const { Star } = require("./db/models/star.model");

const { NativeDate } = require('mongoose');

// // Validation
// const Joi = require('@hapi/joi');

// // Password hashing
// const bcrypt = require('bcryptjs');

// // JsonWebToken
// const jwt = require('jsonwebtoken');

// Import routes
const dishesRoute = require('./routes/dishes');
app.use('/dishes', dishesRoute);
const reviewsRoute = require('./routes/reviews');
app.use('/reviews', reviewsRoute);
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);
const starsRoute = require('./routes/stars');
app.use('/stars', starsRoute);
const authRoute = require('./routes/auth');
app.use('/auth', authRoute);
const privateRouteEx = require('./routes/privateRouteEx');
app.use('/privateRouteEx', privateRouteEx);


app.use(express.json());



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});