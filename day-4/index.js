const express = require('express');
const mongoose = require("mongoose")

const app = express();
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/express-app").then(()=>console.log("database is connected successfully🐇"))
.catch((err)=>{
console.log("Error connecting to mongoDb" , err)
})

const userSchema = new mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    skills:{type:[String]}
})

// create model
const User = mongoose.model("User" , userSchema)

app.get("/" , (req , res)=>{
    res.send("<h1>Hello this is mongodb and express🚀</h1>")
})

app.post("/create-user" , async(req , res)=>{
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(201).json({
            success:true,
            message:'User Created Successfully',
            savedUser
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Something went wrong',
            error
        })
    }
})

app.get("/get-user" , async(req , res)=>{
    try {
        const users = await User.find();
        res.status(200).json({
            success:true,
            message:'User Fetched Successfully',
           users
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Something went wrong',
            error
        })
    }
})



app.listen(8080 , ()=>{
    console.log("Server is running at 8080")
})