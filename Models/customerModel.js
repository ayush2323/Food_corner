require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require("jsonwebtoken")

const customerTemplete = new mongoose.Schema({
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

customerTemplete.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token})
        await this.save()
        return token
    } catch(e) {
        console.log(e)
    }
}

module.exports = mongoose.model('customer_signup', customerTemplete)