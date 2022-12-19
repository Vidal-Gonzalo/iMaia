const express = require("express");
const router = express.Router();
const {
  getComments,
  createInteraction,
  commentAPost,
  followUser,
  deleteComment,
} = require("../controllers/interactionsControllers.js");
const { protect } = require("../middlewares/authMiddleware");

router.get(`/comments/:id`, getComments);

router.post(`/`, protect, createInteraction);

router.post(`/comment`, protect, commentAPost);

router.post(`/follow/user`, protect, followUser);

router.delete(`/comment/:id`, protect, deleteComment);

module.exports = router;
