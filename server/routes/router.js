const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");
const {users} = require( "../model/usermodel");
const jwt = require("jsonwebtoken");
 const env = require("dotenv");
const authorize = require("./middleware");
 env.config();


const router = express.Router();

//Register route
 router.post("/register", async (req, res)=> {
const {name, email, password} = req.body;
 try {
    const userz = await users.findOne({email: email});
    if (userz) {
      return res.status(400).json({message:"user already exist, please log in"});
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await users.create({name: name, email: email, password: bcryptPassword});
     

    // const token = jwt.sign( {id: newUser._id,}, process.env.jwtSecret, { expiresIn: "1h" });

   return res.json({status:"success"});

 } catch (error) {
    console.error(error.message);
    res.status(501).json("server error", error.message)
 }
 });

 router.post("/login", async(req, res)=>{
   const {email, password} = req.body;

   try {
    const user = await users.findOne({email: email});
    console.log(user);
    if(!user) return res.status(401).json("email or password incorrect");

    const validEmail = bcrypt.compare(password, user.password);
    console.log(validEmail);
    if (!validEmail) return res.status(401)("email or password incorrect");


    const token = jwt.sign( {id: user._id, name: user.name}, process.env.jwtSecret, { expiresIn: "2h" });

    return res.json({token});
   } catch (error) {
    console.log(error.message);
    res.status(500).json("server error")
   }
 })

 router.post("/verify", authorize, async(req, res) => {
try {
  return res.json(true)
} catch (error) {
  console.log(error.message);
  res.status(500).json("server error")
}
 })
 router.get("/verify", async(req, res) => {
try {
  return res.json(true)
} catch (error) {
  console.log(error.message);
  res.status(500).json("server error")
}
 })




 module.exports = router;