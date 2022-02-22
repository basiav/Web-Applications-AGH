const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nick: {
        type: String,
        required: [true, 'Nick is required'],
        minlength: 6,
        maxlength: 255,
        unique: [true, 'Nick has to be unique'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minlength: 6,
        max: 255,
        unique: [true, 'Email has to be unique']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        maxlength: 1024,
    },
    // sessions: [{
    //     token: {
    //         type: String,
    //         required: [true, 'Token is required']
    //     },
    //     expiresAt: {
    //         type: Number,
    //         required: true
    //     }
    // }],
    // role: {
    //     type: String,
    // }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };