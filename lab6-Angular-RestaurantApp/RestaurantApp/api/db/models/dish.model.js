// id: number;
// name: string;
// cuisine: string[];
// category: string[];
// ingredients: string[];
// maxDailyAmount: number;
// price: number;
// description: string;
// photos: string[];

const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: [true, 'Restaurant dish id is required {VALUE}, (not the mongoDB "_id" parameter']
    },
    name: {
        type: String,
        required: [true, 'Dishname is required {VALUE}'],
        minlength: 1,
        maxlength: 50,
        trim: true
    },
    cuisine: [
        {
            type: String,
            minlength: 1,
            maxlength: 100,
            trim: true 
        }
    ],
    category: [
        {
            type: String,
            minlength: 1,
            maxlength: 100,
            trim: true 
        }
    ],
    ingredients: [
        {
            type: String,
            minlength: 1,
            maxlength: 100,
            trim: true 
        }
    ],
    maxDailyAmount: {
        type: Number
    },
    price: {
        type: Number
    },
    description: {
        type: String,
    },
    photos: [
        {
            type: String,
        }
    ],
});


const Dish = mongoose.model('Dish', DishSchema);

module.exports = { Dish };