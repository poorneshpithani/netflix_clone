const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongo db connected successfully")
    } catch (error) {
        console.log("Error connecting to mongodb" + error.message)
        process.exit(1); // 1 means there was an error, 0 means success        
    }
}


module.exports = connectDB;

