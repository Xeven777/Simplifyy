const express = require('express');
const validUrl = require('valid-url');
const Url = require('../models/Url');
const { nanoid } = require('nanoid');
const router = express.Router();

// @route  POST /api/url/shorten
// @desc  Create short URL

const num = 5;

//baseUrl for backend url
const baseUrl = process.env.NODE_ENV === 'production'
    ? "https://sl8.vercel.app"
    : "http://localhost:5000";

router.post('/shorten', async (req, res) => {
    const { longUrl, userIdFb } = req.body;
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }
    const urlCode = nanoid(num);
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.json({
                    shortUrl: url.shortUrl,
                    clickCount: url.clickCount,
                });
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    userIdFb,
                    date: new Date(),
                });
                await url.save();
                res.json({
                    shortUrl: url.shortUrl,
                    clickCount: url.clickCount,
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
});

// @route  DELETE /api/url/shorten
// @desc  delete entry

router.delete('/delete/:id', async (req, res) => {
    try {
        await Url.findByIdAndDelete(req.params.id);
        res.json({ ok: true })
    } catch (err) {
        console.error('Error deleting URL:', err);
        res.status(500).json({ error: 'An error occurred while deleting the URL' });
    }
});

module.exports = router;
