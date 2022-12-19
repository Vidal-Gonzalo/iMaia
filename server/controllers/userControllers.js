const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Register new user
//@route Post /users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Por favor, complete todos los campos");
  }

  //Check if user exists - Use a middleware
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
    biography: "",
    phrase: "",
    picUrl: "",
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      // picUrl: user.picUrl, Agregar foto por defecto
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

  //If user is found and passwords match send respective user and token
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      picUrl: user.picUrl,
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
  const user = await User.findById({ _id: req.params.id }, { password: 0 });
  if (user === undefined) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
  res.status(200).json(user);
});

//@desc Get user data by username
//@route GET /users/user/:username
//@access Public
const getUserDataByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne(
    { username: req.params.username },
    { password: 0 }
  );
  if (user === undefined) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
  res.status(200).json(user);
});

//@desc Get user suscriptions by user id
//@route GET /users/:subscriptionType/user/:id
//@access Public
const getUserSubscriptions = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  const subscriptionType = req.params.subscriptionType;
  if (user === undefined) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
  let userSubscriptions = [];
  if (subscriptionType === "followers") {
    for (let i = 0; i < user.followers.length; i++) {
      userSubscriptions.push(
        await User.findById({
          _id: user.followers[i].toString(),
        })
      );
    }
  }
  if (subscriptionType === "followings") {
    for (let i = 0; i < user.following.length; i++) {
      userSubscriptions.push(
        await User.findById({ _id: user.following[i].toString() })
      );
    }
  }
  res.status(200).json(userSubscriptions);
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
  getUserSubscriptions,
};
