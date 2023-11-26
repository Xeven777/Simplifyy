const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const Qr = require('../models/Qrs');

// @route     GET /:code
// @desc      Redirect to long/original URL

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
        if (url) {
            url.clickCount++;
            await url.save();
            return res.redirect(url.longUrl);
        }
        else {
            return res.status(404).json('No URL Found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});

router.get('/QR/:code', async (req, res) => {
    try {
        const url = await Qr.findOne({ urlCode: req.params.code });
        if (url) {
            url.visitCount++;
            await url.save();
            return res.redirect(url.longUrl);
        }
        else {
            return res.status(404).json('No URL Found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});

module.exports = router;