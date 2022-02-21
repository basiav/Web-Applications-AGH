const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    dishId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
        minlength: 1,
        maxlength: 50,
        trim: true,
    },
    reviewHead: {
        type: String,
        required: [true, 'Review head is required'],
    },
    reviewBody: {
        type: String,
        required: [true, 'Review body is required'],
        minlength: 50,
        maxlength: 500
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = { Review };