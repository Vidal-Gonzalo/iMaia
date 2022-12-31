const asyncHandler = require("express-async-handler");
const Texts = require("../models/textsModel");
const User = require("../models/userModel");

//@desc Get all texts
//@route GET /texts
//@access Public
const getTexts = asyncHandler(async (req, res) => {
  const texts = await Texts.find();
  res.status(200).json(texts);
});

//@desc Get texts by the given genre
//@route GET /texts/:genre
//@access Public
const getTextsByGenre = asyncHandler(async (req, res) => {
  if (!req.params.genre) {
    res.status(404);
    throw new Error("Género no encontrado");
  }
  const texts = await Texts.find({ genre: req.params.genre });

  res.status(200).json(texts);
});

//@desc Get texts by the given ID
//@route GET /texts/id/:id
//@access Public
const getTextById = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(404);
    throw new Error("ID no ingresado");
  }

  const textById = await Texts.findById({ _id: req.params.id });

  res.status(200).json(textById);
});

//@desc Get texts by the given user
//@route GET /texts/profile/username/:username
//@access Public
const getUserTexts = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(404);
    throw new Error("ID no ingresado");
  }
  const texts = await Texts.find({ id_author: req.params.id });

  res.status(200).json(texts);
});

const getUserSavedTexts = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    res.status(404);
    throw new Error("Usuario no ingresado");
  }
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
  const userSavedTexts = [];
  for (let i = 0; i < user.savedTexts.length; i++) {
    userSavedTexts.push(
      await Texts.findById({ _id: user.savedTexts[i].toString() })
    );
  }
  res.status(200).json(userSavedTexts);
});

const createPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text");
  }
  if (!req.body.author) {
    res.status(400);
    throw new Error("Please add an author");
  }

  const text = await Texts.create({
    author: req.body.author,
    text: req.body.text,
  });

  res.status(200).json({ text });
});

const viewText = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Por favor ingrese un ID");
  }

  const response = await Texts.updateOne(
    { _id: req.params.id },
    { $inc: { views: 1 } }
  );

  res.status(200).json({ response });
});

module.exports = {
  getTexts,
  getTextsByGenre,
  getTextById,
  getUserTexts,
  getUserSavedTexts,
  createPost,
  viewText,
};
