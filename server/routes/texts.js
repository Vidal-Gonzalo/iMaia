const express = require("express");
const router = express.Router();
const {
  getTextsByGenre,
  getTextById,
  getUserTexts,
  getUserSavedTexts,
  createPost,
} = require("../controllers/textsControllers.js");
const { protect } = require("../middlewares/authMiddleware");

router.get(`/:genre`, getTextsByGenre);

router.get(`/id/:id`, getTextById);

router.get(`/profile/username/:username`, protect, getUserTexts);

router.get(`/profile/savedTexts/username/:username`, getUserSavedTexts);

router.post("/", createPost);

module.exports = router;
