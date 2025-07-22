const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {default: mongoose} = require("mongoose");
const {auth} = require('./middlewares/auth');

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

app.post("/signin", async function(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({
        email,
        password 
    });

    if(!user) {
        res.status(403).json({
            message: "Invalid credintials"
        });
    }

    const token = jwt.sign({
        id: user._id
    }, JWT_SECRET);
    res.json({
        token: token
    });
});

app.post("/todos", auth, async function(req, res) {
    const {title} = req.body;
    const todo = await Todo.create({
        title,
        completed: false,
        userId: req.userId
    });
    res.json(todo);
});

app.get("/todos", auth, async function(req, res) {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
});

app.put("/todos/:id", auth, async function(req, res) {
    const id = req.params.id;
    const { title, completed} = req.body;
    await Todo.findByIdAndUpdate(id, {title, completed}, {new: true});
    res.json({message : "Todo Updated"});
});

app.delete("/todos/:id", auth, async function(req, res) {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.json({message : "Todo Deleted"});
})

app.listen(3000);