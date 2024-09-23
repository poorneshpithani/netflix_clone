const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
require("dotenv").config()



const proctedRoute = async (req,res,next) => {
    try {
        const token = req.cookies["jwt-movie"]

        if(!token){
            return res.status(401).json({success:false, message: "Unauthorized - No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) {
            return res.status(401).json({success:false, message:"unauthorized - invalid token"})
        }
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({success:false, message:"user not found"})
        }
        res.user = user;
        next();

    } catch (error) {
        console.log("error in protectRoute middleware " + error.message)
        res.status(500).json({success:false, message:"internal server error"})
    }
}


module.exports = proctedRoute;