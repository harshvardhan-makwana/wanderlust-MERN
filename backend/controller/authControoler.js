const ExpressError = require("../ExpressError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const generateToken = (id,role) => {
  return jwt.sign({ id,role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  const { username, email, password,role } = req.body;
  if (!username || !email || !password || !role) {
    throw new ExpressError(400,"please add all fields")
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ExpressError(400,"user allready exists")
  }
  const user = await User.create({ username, email, password,role });
  if (user) {
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
   
  } else {
    throw new ExpressError(400,"invalid user data")
  }

};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ExpressError(400,"please registered")
  }
  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role:user.role,
      token: generateToken(user._id,user.role),
    });
  } else {
    throw new ExpressError(400,"invalid email and password")
  }

};

module.exports = { registerUser, loginUser };
