const mongoose = require("mongoose");
const dotenv=require("dotenv");

dotenv.config();

async function dbConnection(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db connected successfully");
    }catch(error){
        console.log("error occured in db");
    }
}

module.exports= dbConnection;