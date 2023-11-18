const express = require('express');
const validUrl = require('valid-url');
const Url = require('../models/Url');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('simply', 3);
const router = express.Router();

// @route  POST /api/url/shorten
// @desc  Create short URL
const num = 2;

//baseUrl for backend url
const baseUrl = process.env.NODE_ENV === 'production' 
    ? "https://smply.vercel.app" 
    : "http://localhost:5000";

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }
    const urlCode = nanoid();
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
