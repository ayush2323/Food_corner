require('dotenv').config()
const mongoose = require('mongoose')
// const validator = require('validator')
// const jwt = require("jsonwebtoken")

const dishTemplete = new mongoose.Schema({
    ItemName: {
        type: String,
        // required: true
    },
    // ItemImage: {
    //     // data: Buffer, 
    //     // contentType: String
    //     type: String
    // },
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

// signupTemplete.methods.generateAuthToken = async function() {
//     try {
//         const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY)
//         this.tokens = this.tokens.concat({token})
//         await this.save()
//         return token
//     } catch(e) {
//         console.log(e)
//     }
// }

module.exports = mongoose.model('dishes', dishTemplete)
