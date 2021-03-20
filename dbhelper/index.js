const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dbRoute = require('./routes/dbroutes')
const dotenv = require('dotenv')
dotenv.config()
const PORT = 4001
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(dbRoute)

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(PORT, () => {
    console.log("dbhelper is running on port " + PORT)
})