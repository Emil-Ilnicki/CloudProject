const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/authroutes");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 4002;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://dbUser:KUyxIWdc6ntntLb4@gitfit.g5gxp.mongodb.net/GitFitDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(PORT, () => {
  console.log("API server is running on port " + PORT);
});
