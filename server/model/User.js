const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    imageUrl: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", User);
