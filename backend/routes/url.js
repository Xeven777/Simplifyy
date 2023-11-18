const express = require('express');
const validUrl = require('valid-url');
const config = require('config');
const Url = require('../models/Url');
const { nanoid } = require('nanoid');
const router = express.Router();

// @route  POST /api/url/shorten
// @desc  Create short URL
const num = 10;
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = "https://simplify-backend.vercel.app";
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }
    const urlCode = nanoid(num);
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }

})

module.exports = router;
