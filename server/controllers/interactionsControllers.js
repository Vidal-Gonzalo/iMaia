const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Texts = require("../models/textsModel");
const User = require("../models/userModel");
const Comment = require("../models/commentsModel");

//@desc Get comments by the given text ID
//@route GET /interactions/comments/:id
//@access Public
const getComments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("ID inválido");
  }

  const texts = await Comment.find({ textId: id }).sort({ createdAt: -1 });

  if (texts.length === 0) {
    res.status(204).json({ message: "No hay comentarios" });
  } else {
    res.status(200).json(texts);
  }
});

//@desc Apply the given interaction
//@route POST /interactions
//@access Private
const createInteraction = asyncHandler(async (req, res) => {
  const { textId, interaction } = req.body;
  let response = "";
  if (!textId || !interaction) {
    res.status(400);
    throw new Error("Por favor, ingrese el ID de texto y la interacción");
  }

  if (interaction === "like") {
    //Find text to be liked
    let text = await Texts.findOne({ _id: textId });
    if (!text) {
      res.status(400);
      throw new Error("No se encontró el texto a interactuar");
    }

    //Then verify if user already liked
    let isLiked = false;
    text.likes.forEach((element) => {
      if (element.toString() === req.user._id.toString())
        return (isLiked = true);
    });

    //If user haven't liked this text, like it
    if (!isLiked) {
      response = await Texts.updateOne(
        { _id: textId },
        { $push: { likes: req.user._id } }
      ); //Else, remove his like
    } else {
      response = await Texts.updateOne(
        { _id: textId },
        { $pull: { likes: req.user._id } }
      );
    }
  }

  if (interaction === "save") {
    const user = req.user;
    let textObjectId = mongoose.Types.ObjectId(textId);
    //Verify if user logged already saved this text
    let isSaved = false;
    user.savedTexts.forEach((element) => {
      if (element.toString() === textId) return (isSaved = true);
    });

    if (!isSaved) {
      response = await User.updateOne(
        { _id: user._id },
        { $push: { savedTexts: textObjectId } }
      );
    } else {
      response = await User.updateOne(
        { _id: user._id },
        { $pull: { savedTexts: textObjectId } }
      );
    }
  }

  //If there isn't any modifiedCount, throw an error
  if (!response.modifiedCount === 1) {
    res.status(400);
    throw new Error("No se ha modificado el texto.");
  }

  res.status(200).json(response);
});

//@desc Comment respective text
//@route POST /interactions/comment
//@access Private
const commentAPost = asyncHandler(async (req, res) => {
  const { textId, comment } = req.body;

  if (!textId || !comment) {
    res.status(400);
    throw new Error("Por favor ingrese un comentario y un ID de texto");
  }

  //Verify if text exists
  const text = await Texts.findById(textId);
  if (!text) {
    res.status(400);
    throw new Error("El texto no existe");
  }

  //Create and store comment
  const newComment = await Comment.create({
    textId: mongoose.Types.ObjectId(textId),
    userId: req.user.id,
    comment: comment,
  });

  //If the comment was created retrieve in json
  if (newComment) {
    res.status(201).json({
      textId: newComment.textId,
      userId: newComment.userId,
      comment: newComment.comment,
    });
  } else {
    //If not, throw an error
    res.status(400);
    throw new Error("No se ha podido crear el comentario");
  }
});

//@desc Follow an user
//@route POST /interactions/follow/user
//@access Private
const followUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("Por favor ingrese un ID de usuario a seguir");
  }

  const userToFollow = await User.findById(userId);
  const loggedUser = req.user;

  //Verify if user logged already saved this text
  let isFollowed = false;
  userToFollow.followers.forEach((element) => {
    if (element.toString() === loggedUser._id.toString())
      return (isFollowed = true);
  });

  if (!isFollowed) {
    response = await User.updateOne(
      { _id: userId },
      { $push: { followers: loggedUser._id } }
    );
    if (response.modifiedCount === 1) {
      response = await User.updateOne(
        { _id: loggedUser._id },
        { $push: { following: userId } }
      );
    }
  } else {
    response = await User.updateOne(
      { _id: userId },
      { $pull: { followers: loggedUser._id } }
    );
    if (response.modifiedCount === 1) {
      response = await User.updateOne(
        { _id: loggedUser._id },
        { $pull: { following: userId } }
      );
    }
  }

  res.status(200).json(response);
});

module.exports = {
  getComments,
  createInteraction,
  commentAPost,
  followUser,
};
