const mongoose = require('mongoose')
const validator = require('validator')

const signupTemplete = new mongoose.Schema({
    fullName : {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    phone: {
        type: Number,
        require: true,
        unique: true,
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
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user_signup', signupTemplete)