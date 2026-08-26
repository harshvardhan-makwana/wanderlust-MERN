const Listing = require("../models/listings");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
   
    res.send("new review saved");
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.send("review delete");
};
