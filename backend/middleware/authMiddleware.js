const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Review=require("../models/review")
const ExpressError=require("../ExpressError");
const Listing = require("../models/listings");
const { listingSchema, reviewSchema } = require("../schema");

module.exports.protect = async (req, res, next) => {
 
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
     return next();
    } catch (error) {
     return res.status(401).json({ message: "Not authorized, token failed " });
    }
  }
  
  
   if(!token){
       return res.status(401).json({message:"Not authorized,no token"})
    }
}

 module.exports.isRoleOwner=(req,res,next)=>{
  if(req.user && req.user.role === "owner"){
    next();
  }else{
    throw new ExpressError(403, "Access Denied, only owner can create listing");
  }
}

module.exports.isListingOwner=async(req,res,next)=>{
  const {id}=req.params;
  const listing=await Listing.findById(id);
  if(!listing){
    throw new ExpressError(404,"page not found")
  }
  if(!listing.owner.equals(req.user._id)){
    return res.status(403).json({success:false,message:"Access Denied, only owner can Edit and Delete Listing"})
  }
  next();
}

module.exports.reviewOwner=async(req,res,next)=>{
  const {reviewId}=req.params;
  const review=await Review.findById(reviewId);
  if(!review){
    throw new ExpressError(404,"page not found");
  } 
  if(!review.author.equals(req.user._id)){
    return res.status(403).json({message:"You are not author of this review"})
  }
  next();
}

module.exports.validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(", ");
    throw new ExpressError(400,errMsg)
  }else{
    next();
  }
}

module.exports.validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(", ");
    throw new ExpressError(400,errMsg)
  }else{
    next();
  }
}