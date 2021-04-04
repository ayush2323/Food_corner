const express = require('express')
const router = express.Router()
const signupTemplete = require("../Models/signupModel")

router.post("/signup", (req, res) => {
    const signedUpOwner = new signupTemplete({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        restaurantName: req.body.restaurantName,
        address: req.body.address,
        password: req.body.password
    })
    signedUpOwner.save()
    .then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

module.exports = router