const express = require('express')
const router = express.Router()
const signupTemplete = require("../Models/signupModel")
const restaurantTemplete = require("../Models/restaurantModel")
const dishTemplete = require("../Models/dishModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

// sign up validation
router.post("/signup", async (req, res) => {
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)
    const roleType = req.body.role
    let signedUpUser;
    const restaurant_data = "nothing"
    if(roleType === 'owner') {
        signedUpUser = new signupTemplete({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            role: roleType,
            address: req.body.address,
            password: securePassword,
            restaurant: []
        })
    } else {
        signedUpUser = new signupTemplete({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            role: roleType,
            address: req.body.address,
            password: securePassword,
        })
    }
    // console.log(signedUpUser)
    const token = await signedUpUser.generateAuthToken()
    signedUpUser.save()
    .then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

// update profile
router.patch("/signup/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updateRestaurant = await signupTemplete.findByIdAndUpdate(_id, req.body, {new: true})
        console.log("line 50", updateRestaurant)
        res.send(updateRestaurant)
    } catch(e) {
        res.status(404).send(e)
    }
})

// login validation
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const userEmail = await signupTemplete.findOne({email})

        const isMatch = bcrypt.compare(password, userEmail.password)

        const token = await userEmail.generateAuthToken()
        console.log(token)

        if(isMatch) {
            if(userEmail.role === 'owner') {
                console.log("login successfull")
                res.status(201).send("owner login successfull")
            } else {
                res.status(201).send("customer login successfull")
            }
        } else {
            console.log("not matching")
            res.status(201).send("Incorrect email or password")
        }
    } catch(e) {
        res.status(400)
    }
})

router.post("/dish", (req, res) => {
    const dishDetail = new dishTemplete({
        ItemName: req.body.ItemName,
        ItemImage: req.body.ItemImage,
        ItemDiscription: req.body.ItemDiscription,
        ItemCatagory: req.body.ItemCatagory,
        ItemType: req.body.ItemType,
        Constituents: req.body.Constituents,
        price: req.body.price
    })
    dishDetail.save()
    .then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

module.exports = router