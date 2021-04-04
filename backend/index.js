const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routesUrl = require('./Routes/router')
const cors = require('cors')

mongoose.connect("mongodb://localhost:27017/Food_Corner", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("connection successfull")
}).catch((e) => {
    console.log(e)
})
app.use(express.json())
app.use(cors())
app.use('/app', routesUrl)

app.listen(4000, () => console.log("server is up and running"))
