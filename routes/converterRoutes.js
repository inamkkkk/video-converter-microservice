const express = require('express');
const router = express.Router();
const converterController = require('../controllers/converterController');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads'));
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${Date.now()}${ext}`);
        }
    })
});

router.post('/convert', upload.single('video'), converterController.convertVideo);
router.get('/status/:jobId', converterController.getConversionStatus);

module.exports = router;
