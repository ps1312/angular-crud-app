const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Body-parser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Mongoose setup and db check
mongoose.connect("mongodb://p_sergio:963852cd@ds111478.mlab.com:11478/myanguapp");
mongoose.connection.on("connected", function(){
    console.log("Connected to db");
});
mongoose.connection.on("error", function(err){
    console.log(err);
});

//Passport setup
app.use(passport.initialize());
app.use(passport.session());
//Use jwt strategy (config/passport only returns one function)
require("./config/passport")(passport);

//CORS setup
app.use(cors());

//User routes
app.use("/user", userRoutes);
app.use("/posts", postRoutes);

//Home page
app.get("/", function(req, res){
    res.send("working");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Initialize server on port
const port = process.env.PORT;
app.listen(port, function(){
    console.log("Server started at port " + port);
});
