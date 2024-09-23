const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const generateToken = require("../utils/generateTokens");
const { json } = require("express");


const signup = async (req,res) =>{
    try {
        const {email, password, username} = req.body;

        if(!email || !password || !username){
            return res.status(400).json({success:false, message:"All fields are required"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({success:false, message:"Invalid email"});
        }

        if(password.length < 6){
            return res.status(400).json({success:false, message:"password must be at least 6 characters"})
        }

        const existingUserEmail = await User.findOne({email:email})

        if(existingUserEmail){
            return res.status(400).json({success:false, message:" Email already exists"})
        }

        const existingUserUsername = await User.findOne({username:username})

        if(existingUserUsername) {
            return res.status(400).json({success:false, message:"username already exists"})
        }

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt)

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password:hashedPassword,
            username,
            image
        })

        generateToken(newUser._id,res);

        await newUser.save();

        // remove password from the response
        res.status(201).json({
            success:true,
            user:{
                ...newUser._doc,
                password:""
            }
        })
    } catch (error) {
        console.log("Error in signup ", error.message)
        res.status(500).json({success:false, message:"Internal server error"})
    }
}



const login = async (req,res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false, message:"All fields are required"})
        }
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({success:false, message:"Invalid credientials "})
        }
         const isPasswordMatch = await bcryptjs.compare(password, user.password);

         if(!isPasswordMatch){
            return res.status(400).json({success:false, message:"invalid credentials"})
         }
         generateToken(user._id,res)
         res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:""
            }
         })
    } catch (error) {
        console.log("Error in login " , error.message)
        res.status(500).json({success:false,message:"Internal server error"})
    }
}






const logout = async (req,res) =>{
    try {
        res.clearCookie("jwt-movie");
        res.status(200).json({success:true, message:"logged out successfully"})
    } catch (error) {
        console.log("Error in logout ", error.message)
        res.status(500).json({success:false, message:"Internal server error"})
    }
}

const authCheck = async(req,res)=>{
    try {
        res.status(200).json({success:true, user:req.user})
    } catch (error) {
        console.log("Error in authcheck ", error.message)
        res.status(500).json({success:false, message:"Internal server error"})
    }
}







module.exports = {signup, login, logout, authCheck};