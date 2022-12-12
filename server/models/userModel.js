const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
    },
    phrase: {
      type: String,
    },
    picUrl: {
      type: String,
      // default: "default-avatar.png",
    },
    banner: {
      type: String,
      // default: "default-banner.jpg",
    },
    texts: {
      type: Array,
    },
    followers: {
      type: Array,
    },
    following: {
      type: Array,
    },
    savedTexts: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
