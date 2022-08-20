const express = require("express");
const router = express.Router();
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadFile, getFileStream } = require("../controllers/s3Controller");

const { updateAvatarUrl } = require("../controllers/profileController");

router.get("/image/:key", (req, res) => {
  const key = req.params.key;
  console.log(typeof key,key,  key === null)
  if (key === "null") {
    console.log("In here")
    return { "status": "No Image", "avatar_url":"" }
  } else {
    const readStream = getFileStream(key);
    readStream.pipe(res);
  }
});

router.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result.key)
  updateAvatarUrl({
    key: result.key,
    id: req.body.id,
    id_type: req.body.id_type,
    id_number: req.body.id_number,
    type: req.body.type,
  });
  res.send({ imagePath: `/images/${result.Key}` });
});

module.exports = router;
