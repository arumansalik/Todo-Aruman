const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {default: mongoose} = require("mongoose");

const User = require("./model/Users");
const Todo = require("./model/Todo");
require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "ilovearuman";

app.post("/signup",async function(req, res) {
    const {name , email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    res.json({
        message: "Signup SuccessFull"
    });
}); 

app.listen(3000);