const ExpressError = require("../ExpressError.js");
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");
const cloudinary=require('cloudinary').v2;


module.exports.index = async (req, res) => {
  const listings = await Listing.find();
  if (!listings) {
    throw new ExpressError(404, "no listings found");
  }
  res.status(200).json(listings);
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate("owner", "username email")
    .populate({
      path: "reviews",
      populate: { path: "author", select: "username" },
    });
  if (!listing) {
    throw new ExpressError(404, "no listing found");
  }

  res.status(200).json(listing);
};

module.exports.createListings = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  res.status(201).json(newListing);
};

module.exports.updateListings = async (req, res) => {
  let { id } = req.params;
  let updateData = { ...req.body };
  
  if (req.file) {
    updateData.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  const listing = await Listing.findByIdAndUpdate(id, updateData,{returnDocument:'after'});
  res.status(200).json({ message: "Listing updated", listing });
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  const listing=await Listing.findById(id);
  if(listing.image && listing.image.filename){
    await cloudinary.uploader.destroy(listing.image.filename)
  }
  await Listing.findByIdAndDelete(id);
  res.status(200).json({ message: "Listing was deleted" });
};
