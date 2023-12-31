const express = require('express');
const validUrl = require('valid-url');
const Qr = require('../models/Qrs');
const { nanoid } = require('nanoid');
const QRcode = require('qrcode');
const router = express.Router();

// @route  POST /api/qr
// @desc  Create short URL

const num = 7;

//baseUrl for backend url
const baseUrl = process.env.NODE_ENV === 'production'
    ? "https://sl8.vercel.app"
    : "http://localhost:5000";

router.post('/', async (req, res) => {
    const { longUrl, userIdFb } = req.body;
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid url');
    }
    const urlCode = nanoid(num);
    if (validUrl.isUri(longUrl)) {
        try {
            let qrs = await Qr.findOne({ longUrl });
            if (qrs) {
                res.json({
                    qrCode: qrs.qrCode,
                    shortQRUrl: qrs.shortQRUrl,
                    visitCount: qrs.visitCount,
                });
            } else {
                const shortQRUrl = baseUrl + '/QR/' + urlCode;
                const qrCodeBuffer = await QRcode.toBuffer(shortQRUrl);
                const qrCode = qrCodeBuffer.toString("base64");
                qrs = new Qr({
                    longUrl,
                    urlCode,
                    shortQRUrl,
                    qrCode,
                    userIdFb,
                    date: new Date(),
                });
                await qrs.save();
                res.json({
                    shortQRUrl: qrs.shortQRUrl,
                    qrCode: qrs.qrCode,
                    visitCount: qrs.visitCount,
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


router.delete('/delete/:id', async (req, res) => {
    try {
        await Qr.findByIdAndDelete(req.params.id);
        res.json({ ok: true })
    } catch (err) {
        console.error('Error deleting URL:', err);
        res.status(500).json({ error: 'An error occurred while deleting the URL' });
    }
});
module.exports = router;
