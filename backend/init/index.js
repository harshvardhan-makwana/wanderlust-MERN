const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");
const connectDB=require("../config/db")


connectDB();

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'6a75e981b3193b542e435dce'}))
    await Listing.insertMany(initData.data)
    console.log("data was initialize")
}
initDB();