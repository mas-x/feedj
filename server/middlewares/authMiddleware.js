const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      errorMessage: "Access Denied",
    });
  }
  try {
    req.user = jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      errorMessage: "Access Denied",
    });
  }
};
