const { OK } = require('http-status-codes');
const router = require('express').Router();
const multer = require('multer');
const upload = multer();

const { uploadToImgur } = require('./images.service');

router.post('/', upload.single('image'), async (req, res) => {
  const url = await uploadToImgur(req.file);
  res.status(OK).send(url);
});

module.exports = router;
