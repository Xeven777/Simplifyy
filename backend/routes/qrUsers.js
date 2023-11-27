const express = require('express');
const router = express.Router();
const Qrs = require('../models/Qrs');

// @route     GET /:userid
// @desc      get list of all qrs for a user

router.get('/:userid', async (req, res) => {
    try {
        const qr = await Qrs.find({ userIdFb: req.params.userid });
        if (qr.length > 0) {
            return res.json(qr);
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