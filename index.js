require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()
const routesUrl = require('./Routes/router')
const cors = require('cors')
const port = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("connection successfull")
}).catch((e) => {
    console.error(e)
})
app.use(express.json())
app.use(cors())
app.use(routeURL)
app.use(cookieParser())

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.listen(port, () => console.log("server is up and running at port" + port))
