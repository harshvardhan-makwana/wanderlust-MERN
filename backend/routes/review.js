const express=require("express")
const router=express.Router({mergeParams:true});
const asyncHandler=require("express-async-handler")
const {createReview,deleteReview}=require("../controller/review")
const{protect,reviewOwner,validateReview}=require("../middleware/authMiddleware")


router.post("/",protect,validateReview,asyncHandler(createReview))
router.delete("/:reviewId",protect,reviewOwner,asyncHandler(deleteReview))

module.exports=router;