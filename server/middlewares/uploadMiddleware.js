const multer = require("multer");
const PATH = "./tmp/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //resize and upload
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(".");
    const ext = fileName[fileName.length - 1];
    const filename = `${req.user.id}.${ext}`;
    cb(null, filename);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only .png, .jpg, .jpeg and .gif"));
    }
  },
  limits: {
    fieldSize: 500000,
  },
});
const uploadSingleImage = upload.single("image");

module.exports = uploadSingleImage;
