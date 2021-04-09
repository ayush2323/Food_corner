require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require("jsonwebtoken")

const signupTemplete = new mongoose.Schema({
    fullName : {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        // unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    phone: {
        type: Number,
        require: true,
        // unique: true,
        maxlength: 10,
        minlenth: 10
    },
    role: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is not strong")
            }
        }
    },
    restaurant: [{
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
            // unique: true,
            trim: true
        },
        restaurantPhone: {
            type: Number,
            required: true,
        },
        restaurantMenu: [{
            ItemName: {
                type: String,
                // required: true
            }, 
            ItemImage: {
                // data: Buffer, 
                // contentType: String
                type: String
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
        }]
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

signupTemplete.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token})
        await this.save()
        return token
    } catch(e) {
        console.log(e)
    }
}

module.exports = mongoose.model('user_signup', signupTemplete)



/*
_id
:
606ef44fdd8e8a3340678514
fullName
:
"Ayush Tiwari"
email
:
"ayush@gmail.com"
phone
:
9897979798
role
:
"owner"
address
:
"1"
password
:
"$2b$10$McQ5yAb4GrZOK7M6klxnrutlkeRaOxro4ugCTna6luU0M4Wt/BM6a"
restaurant
:
0
:
_id
:
606ef461dd8e8a3340678516
restaurantName
:
"delhi darbaad"
restaurantDiscription
:
"5 star"
restaurantAddress
:
"delhi"
restaurantPhone
:
9580048004
restaurantMenu
:
tokens
:
0
:
_id
:
606ef44fdd8e8a3340678515
token
:
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDZlZjQ0ZmRkOGU4YTMzN..."
date
:
2021-04-08T12:17:19.388+00:00
__v
:
0
*/