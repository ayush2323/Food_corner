const express = require('express')
const router = express.Router()
const signupTemplete = require("../Models/signupModel")
const dishTemplete = require("../Models/dishModel")
const bcrypt = require('bcrypt')
// const user_data = require("../")

router.post("/signup", async (req, res) => {
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    const signedUpUser = new signupTemplete({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        address: req.body.address,
        password: securePassword
    })
    signedUpUser.save()
    .then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const userEmail = await signupTemplete.findOne({email})

        const isMatch = bcrypt.compare(password, userEmail.password)

        if(isMatch) {
            if(userEmail.role === 'owner') {
                console.log("login successfull")
                res.status(201)
            } else {
                res.status(201)
            }
        } else {
            console.log("not matching")
            res.status(201)
        }
    } catch(e) {
        res.status(40).send("Incorrect email or password")
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