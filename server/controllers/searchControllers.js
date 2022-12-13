const asyncHandler = require("express-async-handler");
const Texts = require("../models/textsModel");
const User = require("../models/userModel");

//@desc Get users or texts depending on the given type parameter
//@route GET /search/:type/:name
//@access Public
const getElementsByName = asyncHandler(async (req, res) => {
  if (!req.params.type || !req.params.name) {
    res.status(404);
    throw new Error("Tipo o nombre inválido");
  }
  const { type, name } = req.params;
  let response = [];
  if (type === "writings" || type === "poems") {
    response = await Texts.find({ genre: type, title: new RegExp(name, "i") });
  }
  if (type === "users") {
    response = await User.find({ username: new RegExp(name, "i") });
  }

  res.status(200).json(response);
});

module.exports = {
  getElementsByName,
};
