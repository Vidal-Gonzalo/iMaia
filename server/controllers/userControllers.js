const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Register new user
//@route Post /users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Por favor, complete todos los campos");
  }

  //Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("¡Ese usuario ya existe!");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Data de usuario inválida");
  }
});

//@desc Authenticate a user
//@route POST /users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Credenciales inválidas");
  }
});

//@desc Get user data
//@route GET /users/:id
//@access Public
const getUserData = asyncHandler(async (req, res) => {
  if (!req.params.id) res.status(400);
  const user = await User.findById({ _id: req.params.id });
  if (user === undefined) res.status(404);
  res.status(200).json(user);
});

//@desc Get user data by username
//@route GET /users/user/:username
//@access Public
const getUserDataByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (user === undefined) res.status(404);
  res.status(200).json(user);
});

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  getUserDataByUsername,
};
