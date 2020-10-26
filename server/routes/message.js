const express = require("express");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const Message = require("../model/Message");
const User = require("../model/User");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      userID: req.user.id,
    }).sort("-createdAt");
    return res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "Internal server error",
    });
  }
});

router.post(
  "/:username",
  [
    check("message", "Message should not be empty")
      .not()
      .isEmpty()
      .trim()
      .isLength({
        min: 10,
      })
      .withMessage("Message should be atleast 10 characters long"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
      }
      const user = await User.findOne({
        username: req.params.username,
      });
      if (!user) {
        return res.status(400).send({
          errorMessage: "User not found",
        });
      }
      const message = new Message({
        userID: user.id,
        message: req.body.message,
      });
      await message.save();
      return res.json(message);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        errorMessage: "Internal server error",
      });
    }
  }
);

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).send({
        errorMessage: "Message not found",
      });
    }
    if (!message.userID.equals(req.user.id)) {
      return res.status(401).send({
        errorMessage: "Access Denied",
      });
    }
    await message.deleteOne();
    res.json({
      id: message._id,
      successMessage: "Message deleted successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      errorMessage: "Internal server error",
    });
  }
});

module.exports = router;
