const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
dotenv.config();
const app = express();

app.use(express.json(), express.urlencoded({ extended: false }));
app.use(helmet());
mongoose.connect(
  process.env.MONGOOSE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB Database");
  }
);

//Serve Staic Pages
app.use("/uploads", express.static(path.join(__dirname, "public", "images")));
//Routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const messageRoute = require("./routes/message");
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server Started`);
});
