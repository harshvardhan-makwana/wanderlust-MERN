const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const Listing = require("./models/listings.js");
const listingRouter = require("./routes/listing.js");
const Review = require("./models/review.js");
const userRouter = require("./routes/user.js");
const reviewRouter=require("./routes/review.js")
const ExpressError=require("./ExpressError.js")
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

require("dotenv").config();

connectDB();
app.use(express.json());
app.use(cors());

app.use("/listings", listingRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("root is working");
});

app.use("/listings/:id/reviews",reviewRouter );

app.use((req,res,next)=>{
  next(new ExpressError(404,"page not found"))
})

app.use((err,req,res,next)=>{
  let {statusCode=500,message="something went wrong!"}=err;
  res.status(statusCode).send(message)
})

app.listen(3000, () => {
  console.log(`app is listening on port ${process.env.PORT}`);
});
