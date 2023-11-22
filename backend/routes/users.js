const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

// @route     GET /:userid
// @desc      Redget list of all urls for a user

router.get('/:userid', async (req, res) => {
    try {
        console.log(req.params.userid);
        const url = await Url.find({ userIdFb: req.params.userid });
        if (url.length > 0) {
            console.log(url);
            return res.json(url);
            // return res.redirect(url.longUrl);
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