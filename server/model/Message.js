const mongoose = require("mongoose");

const Message = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", Message);
