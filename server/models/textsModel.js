const mongoose = require("mongoose");

const textsSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    id_author: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    views: {
      type: Number,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
      require: true,
    },
    likes: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Texts", textsSchema);
