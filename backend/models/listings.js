const mongoose = require("mongoose");
const User=require('./user')

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});



const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
