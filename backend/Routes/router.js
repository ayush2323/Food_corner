const express = require('express')
const router = express.Router()
const signupTemplete = require("../Models/signupModel")
const dishTemplete = require("../Models/dishModel")
const bcrypt = require('bcrypt')

router.post("/signup", async (req, res) => {
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    const signedUpOwner = new signupTemplete({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        restaurantName: req.body.restaurantName,
        address: req.body.address,
        password: securePassword
    })
    signedUpOwner.save()
    .then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
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

// router.get("/dish", async (res, req) => {
//     try {
//         const dishes = await dishData.find({});
//         console.log(dishes)
//         res.send(dishes)
//     } catch(e) {
//         res.send(e)
//     }
// })

module.exports = router