const mongoose = require('mongoose')

const RestaurantTemplete = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
        trim: true
    },
    restaurantDiscription: {
        type: String,
        required: true,
        trim: true
    },
    restaurantAddress: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    restaurantOwner: {
        type: String,
        required: true,
        trim: true
    },
    restaurantPhone: {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('user_restaurant', RestaurantTemplete)