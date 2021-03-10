const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoute = require("./routes/auth")
const dotenv = require('dotenv')
dotenv.config()
const PORT = 4000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(authRoute)

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://dbUser:KUyxIWdc6ntntLb4@gitfit.g5gxp.mongodb.net/GitFitDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dbUser:<password>@gitfit.g5gxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


app.listen(PORT, () => {
    console.log("server is running on port " + PORT)
})