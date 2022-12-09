const asyncHandler = require("express-async-handler");
//Cuando tenga que crear una publicación revisar documentación. El model debe coincidir
//con los elementos agregados desde el front-end.
const Texts = require("../models/textsModel");

//@desc Get texts by the given genre
//@route GET /texts/:genre
//@access Public
const getTextsByGenre = asyncHandler(async (req, res) => {
  const texts = await Texts.find({ genre: req.params.genre });

  if (texts === undefined) res.status(404);

  res.status(200).json(texts);
});

//@desc Get texts by the given ID
//@route GET /texts/:genre
//@access Public
const getTextById = asyncHandler(async (req, res) => {
  const textById = await Texts.findById({ _id: req.params.id });

  if (textById === undefined) return res.status(404);

  res.status(200).json(textById);
});

//@desc Get texts by the given user
//@route GET /texts/username/:username
//@access Temporarily private
const getUserTexts = asyncHandler(async (req, res) => {
  const texts = await Texts.find({ id_author: req.user.id });

  res.status(200).json({ texts });
});

const getUserSavedTexts = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (username === "undefined") {
    return res.status(404).json({ message: "" });
  }
  const user = "asd";
  if (user === undefined) {
    return res.status(404).json({ message: "" });
  }
  const userSavedTexts = "asd";
  if (userSavedTexts === undefined) {
    return res.status(404).json({ message: "" });
  }
  res.status(200).json({ userSavedTexts });
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

module.exports = {
  getTextsByGenre,
  getTextById,
  getUserTexts,
  getUserSavedTexts,
  createPost,
};
