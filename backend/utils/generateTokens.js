const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId, res) => {
    const token =jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "15d"});

    res.cookie("jwt-movie",token,{
        maxAge: 15*24*60*60*1000,  // 15 days in ms
        httpOnly:true,  // prevent xss attacks cross-site scripting attacks, make it not be accessed by js
        sameSite:"strict",  // csrf attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
    return token;
}

module.exports = generateToken;

