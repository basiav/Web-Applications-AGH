const mongoose = require('mongoose');

const StarSchema = new mongoose.Schema({
    dishId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    },
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: [true, 'Author is required'],
    //     minlength: 1,
    //     maxlength: 50,
    //     trim: true,
    // },
    stars: {
        type: Number,
        required: [true, 'Stars value is required'],
        min: 0,
        max: 5
    }
});

const Star = mongoose.model('Star', StarSchema);

module.exports = { Star };