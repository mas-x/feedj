const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const uploadSingleImage = require("../middlewares/uploadMiddleware");
const sharp = require("sharp");

//Get Profile
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });
    if (!user) {
      return res.status(404).json({
        errorMessage: "Profile not found",
      });
    }
    return res.json({
      username: user.username,
      email: user.email,
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      errorMessage: "Internal Server Error",
    });
  }
});

//Register
router.post(
  "/",
  [
    check("username", "Username is not valid")
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 255 })
      .trim()
      .escape(),
    check("email", "Email is not valid")
      .not()
      .isEmpty()
      .isEmail()
      .isLength({ min: 6, max: 255 })
      .normalizeEmail(),
    check("password", "Password is not valid")
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 255 })
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("Password and Confirm Password should match");
        }
        return true;
      }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      const { username, email, password } = req.body;
      const userWithEmail = await User.findOne({
        email,
      });
      if (userWithEmail) {
        return res.status(400).json({
          errorMessage: "User with this email already exists",
        });
      }
      const userWithUsername = await User.findOne({
        username,
      });
      if (userWithUsername) {
        return res.status(400).json({
          errorMessage: "User with this username already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const user = new User({
        username,
        email,
        password: hashedPass,
      });
      await user.save();
      res.json({
        username,
        email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ errorMessage: "Internal server error occurred" });
    }
  }
);
//Profile Picture Route
router.post("/upload", authMiddleware, (req, res) => {
  uploadSingleImage(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        errorMessage: error.message,
      });
    }
    try {
      console.log(req.file)
      //resize image and save into public directory
      await sharp(req.file.path).resize(100,100).toFile(`public/images/${req.file.filename}`);
      const user = await User.findById({ _id: req.user.id });
      user.imageUrl = req.file.filename;
      await user.save();
      res.json({
        successMessage: "Profile picture updated successfully",
        id: req.user.id,
        imageUrl: req.file.filename,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorMessage: "Internal server error",
      });
    }
  });
});

//Profile Update Route (Email, Username)
router.put(
  "/update",
  [
    check("username", "Invalid Username").not().isEmpty().isLength({
      min: 6,
      max: 255,
    }),
    check("email", "Invalid Email").not().isEmpty().isEmail().isLength({
      min: 6,
      max: 255,
    }),
  ],
  authMiddleware,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      const { username, email } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({
          errorMessage: "User not found",
        });
      }
      const userWithEmail = await User.findOne({
        email,
      });
      if (userWithEmail && !userWithEmail._id.equals(req.user.id)) {
        return res.status(400).send({
          errorMessage:
            "User with this email already exist. Please try another email!",
        });
      }
      const userWithUsername = await User.findOne({
        username,
      });
      if (userWithUsername && !userWithUsername._id.equals(req.user.id)) {
        return res.status(400).send({
          errorMessage:
            "User with this username already exists. Please try another username",
        });
      }

      user.username = username;
      user.email = email;
      await user.save();
      return res.json({
        successMessage: "User updated successfully",
        username,
        email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        errorMessage: "Internal server error occurred",
      });
    }
  }
);

//Update Password Route
router.put(
  "/password",
  [
    check("currentPassword", "Invalid current password").not().isEmpty(),
    check("newPassword", "Invalid new password")
      .not()
      .isEmpty()
      .withMessage("New password should not be empty")
      .isLength({ min: 6, max: 255 })
      .withMessage("Password should be atleast 6 characters long"),
  ],
  authMiddleware,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(error.array);
      }
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).json({
          errorMessage: "User not found",
        });
      }
      const { currentPassword, newPassword } = req.body;
      const isOldPassValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isOldPassValid) {
        return res.status(400).send({
          errorMessage: "Current password is invalid",
        });
      }
      //set new password
      const salt = await bcrypt.genSalt(10);
      const hashedNewPass = await bcrypt.hash(newPassword, salt);
      user.password = hashedNewPass;
      await user.save();
      return res.json({
        successMessage: "Password updated successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        errorMessage: "Internal server error occurred",
      });
    }
  }
);

router.delete("/", authMiddleware, async (req, res) => {
  try {
    //todo delete user's messages as well
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found",
      });
    }
    res.json({
      successMessage: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      errorMessage: "Internal server error",
    });
  }
});

module.exports = router;
