const express = require("express");
const router = express.Router();
const {
  getTexts,
  getTextsByGenre,
  getTextById,
  getUserTexts,
  getUserSavedTexts,
  createPost,
  viewText,
} = require("../controllers/textsControllers.js");

router.get(`/`, getTexts);

router.get(`/:genre`, getTextsByGenre);

router.get(`/id/:id`, getTextById);

router.get(`/profile/username/:id`, getUserTexts);

router.get(`/profile/savedTexts/username/:username`, getUserSavedTexts);

router.post("/", createPost);

router.put("/view/:id", viewText);

module.exports = router;
