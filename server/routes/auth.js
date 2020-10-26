const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.post(
  "/",
  [
    check("username", "Username not valid").not().isEmpty(),
    check("password", "Password not valid").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
      }
      const { username, password } = req.body;
      const user = await User.findOne({
        username,
      });
      if (!user)
        return res.status(400).send({
          errorMessage: "Invalid username or password",
        });

      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass) {
        return res.status(400).send({
          errorMessage: "Invalid username or password",
        });
      }
      //Sign token
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET
      );

      return res.json({
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "Internal server error occurred",
      });
    }
  }
);
module.exports = router;
