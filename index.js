const express = require("express");
const app = express();
const morgan = require("morgan");
const multer = require("multer");
const cors = require('cors');


app.use(cors())

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/single", upload.single("image"), (req, res) => {
    console.log(req.file)
  res.send("single File upload success");
});

app.post("/multiple", upload.array("images"), (req, res) => {
    console.log(req.file)
  res.send("multiple File upload success");
});

app.use(morgan("dev"));

app.listen(7000);
