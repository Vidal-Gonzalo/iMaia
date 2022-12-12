const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    textId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Texts",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    comment: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentsSchema);
