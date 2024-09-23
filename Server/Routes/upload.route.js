const express = require("express");
const router = express.Router();
const { ImageConverterController, MetaDetaCont } = require("../Controllers/ImageConverter.controller")
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

router.post('/Converted', upload.single("file"), ImageConverterController);
router.post('/MetaData', upload.single("file"), MetaDetaCont);




module.exports = router;