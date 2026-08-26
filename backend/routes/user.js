const express = require("express");
const router = express.Router();
const asyncHandler=require("express-async-handler")
const {registerUser,loginUser}=require("../controller/authControoler")

router.post("/register",asyncHandler(registerUser));
router.post("/login",asyncHandler(loginUser))
module.exports=router