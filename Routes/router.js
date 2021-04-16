require('dotenv').config()
const express = require('express')
const router = express.Router()
const ownerTemplete = require("../Models/signupModel")
const customerTemplete = require("../Models/customerModel")
const dishTemplete = require("../Models/onlyDish")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const multer = require('multer')
const url = process.env.MONGO || "mongodb://localhost:27017/"

router.use(express.static(__dirname + "./public/"))

let Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    storage: Storage
}).single('ItemImage')

router.post('/upload', upload, function(req, res, next) {
    let imsageFile = req.file.filename
    let success = req.file.filename = "uploded successfully"
    res.render('upload-file', {title: 'upload file', success:success})
})

router.get('/upload', function(req, res, next) {

})

// sign up validation
router.post("/signup", async (req, res) => {
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)
    const roleType = req.body.role
    let signedUpUser;
    if (roleType === 'owner') {
        signedUpUser = new ownerTemplete({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            role: roleType,
            address: req.body.address,
            password: securePassword,
            restaurant: []
        })
    } else {
        signedUpUser = new customerTemplete({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            role: roleType,
            address: req.body.address,
            password: securePassword,
        })
    }

    const token = await signedUpUser.generateAuthToken()
    // res.cookie("jwt", token, {
    //     expires: new Date(Date.now() + 30000),
    //     httpOnly: true 
    // })
    // console.log(cookie)
    console.log(signedUpUser)
    signedUpUser.save()
        .then(data => {
            res.status(200).json(data)
        }).catch(error => {
            console.log(error)
            // res.status(422).send(error)
        })
})

// update profile
router.patch("/signup/:id", async (req, res) => {
    try {
        const _id = req.params.id
        console.log("line 56 " + _id)
        console.log("line 57 " + req.body)
        const updateData = await ownerTemplete.findByIdAndUpdate(_id, req.body, { new: true })
        console.log("line 59 " + updateData)
        console.log("line 50", updateData)
        res.send(updateData)
    } catch (e) {
        res.status(404).send(e)
    }
})

// update menu
router.patch("/signup/dish/:id", async (req, res) => {
    try {
        const _id = req.params.id
        console.log("line 93 " + _id)
        console.log("line 94 " + req.body)
        const updateData = await ownerTemplete.findByIdAndUpdate(_id, req.body, { new: true })
        console.log("line 96 " + updateData)
        res.send(updateData)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get("/signup", async (req, res) => {
    try {
        const getAllData = await ownerTemplete.find({})
        res.status(201).send(getAllData)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/signup/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const getUserData = await ownerTemplete.findOne({ _id })
        res.json(getUserData)
    } catch (e) {
        console.log(e)
    }
})

// login validation
router.post("/login", async (req, res) => {
    try {
        console.log("in login")
        const email = req.body.email
        const password = req.body.password
        const getUser = await ownerTemplete.findOne({ email })
        console.log("line 71 " + getUser)
        const isMatch = bcrypt.compare(password, getUser.password)
        console.log("line 74 " + isMatch)
        const token = await getUser.generateAuthToken()
        console.log("line 76 " + token)
        // res.cookie("jwt", token, {
        //     expires: new Date(Date.now() + 3000000000000),
        //     httpOnly: true
        // })
        // console.log("line 81 " + cookie)

        if (isMatch) {
            if (getUser.role === 'owner') {
                console.log("login successfull")
                res.status(201).json(getUser)
            } else {
                res.status(201).json(getUser)
            }
        } else {
            console.log("not matching")
            res.status(201).send("Incorrect email or password")
        }
    } catch (e) {
        res.status(400)
    }
})

router.patch("/dish/:id", upload, async (req, res) => {
    try {
        const _id = req.params.id
        // console.log(upload)
        // console.log(req.body)
        // const updateData = await ownerTemplete.findByIdAndUpdate(_id, req.body, {new: true})
        // res.send(updateData)
        // const getUserData = await ownerTemplete.findOne({_id})
        // console.log("line 125 " + getUserData)
        // let newData = JSON.parse(JSON.stringify(getUserData))
        // console.log("line 127 " + newData.restaurant[0].restaurantMenu)
        // newData.restaurant[0].restaurantMenu = req.body
        // console.log("line 129 " + newData.restaurant[0].restaurantMenu)
        // newData.save()
        // .then(data => {
        //     res.status(200).json(data)
        // }).catch(error => {
        //     console.log(error)
        //     // res.status(422).send(error)
        // })
    } catch (e) {
        res.status(400)
    }
})

router.post("/dishes", async (req, res) => {
    try {
        console.log("line 187 "+req.body)
        dishDetails = new dishTemplete({
            ItemName: req.body.ItemName,
            ItemDiscription: req.body.ItemDiscription,
            ItemCatagory: req.body.ItemCatagory,
            ItemType: req.body.ItemType,
            Constituents: req.body.Constituents,
            price: req.body.price,
            restaurantName: req.body.restaurantName,
            restaurantAddress: req.body.restaurantAddress,
            restaurantPhone: req.body.restaurantPhone
        })
        dishDetails.save()
            .then(data => {
                res.status(200).json(data)
            }).catch(error => {
                console.log(error)
                // res.status(422).send(error)
            })
    } catch (e) {
        console.log(e)
    }
})

router.get("/dishes", async(req, res) => {
    try {
        const getDishes = await dishTemplete.find()
        res.json(getDishes)
    } catch(e)  {console.log(e)}
})

router.get("/dish_detail/:id", async(req, res) => {
    try {
        const _id = req.params.id
        console.log("line 200 "+_id)
        const getDishData = await dishTemplete.findOne({ _id })
        console.log("line 202 "+ getDishData)
        res.json(getDishData)
    } catch(e) {console.log(e)}
})

router.get("/owner_dish_detail/:id", async(req, res) => {
    try {
        console.log("line 222")
        const _id = req.params.id
        console.log("line 223"+ _id)
        const getOwner_dish_detail = await ownerTemplete.findOne({_id})
        console.log("line 225"+ getOwner_dish_detail)
        res.json(getOwner_dish_detail)
    } catch(e) {console.log(e)}
})

// router.post("/dish", (req, res) => {
//     const dishDetail = new dishTemplete({
//         ItemName: req.body.ItemName,
//         ItemImage: req.body.ItemImage,
//         ItemDiscription: req.body.ItemDiscription,
//         ItemCatagory: req.body.ItemCatagory,
//         ItemType: req.body.ItemType,
//         Constituents: req.body.Constituents,
//         price: req.body.price
//     })
//     dishDetail.save()
//     .then(data => {
//         res.json(data)
//     }).catch(error => {
//         res.json(error)
//     })
// })

module.exports = router