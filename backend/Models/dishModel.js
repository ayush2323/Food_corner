const mongoose = require('mongoose')

const dishTemplete = new mongoose.Schema({
    ItemName: {
        type: String,
        required: true,
        unique: true
    }, 
    ItemImage: {
        type: {data: Buffer, contentType: String}
    },
    ItemDiscription: {
        type: String
    }, 
    ItemCatagory: {
        type: String,
        default: "other"
    },
    ItemType: {
        type: String,
        default: "veg"
    },
    Constituents: {
        type: String
    },
    price: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('dishe', dishTemplete)