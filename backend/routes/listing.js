const express = require("express");
const router = express.Router();
const multer  = require('multer')
const {storage}=require("../cloudConfig")
const upload = multer({  storage})

const {
  index,
  showListings,
  createListings,
  updateListings,
  destroyListing,
} = require("../controller/listings");
const { protect,isRoleOwner,isListingOwner,validateListing } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(index));
router.get("/:id", asyncHandler(showListings));
router.post("/", protect,isRoleOwner,upload.single("listing"),validateListing,asyncHandler(createListings));

router.put("/:id", protect,isListingOwner,upload.single("listing"),asyncHandler(updateListings));
router.delete("/:id", protect,isListingOwner, asyncHandler(destroyListing));

module.exports = router;
