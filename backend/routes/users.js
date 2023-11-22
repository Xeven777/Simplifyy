const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

// @route     GET /:userid
// @desc      get list of all urls for a user

router.get('/:userid', async (req, res) => {
    try {
        const url = await Url.find({ userIdFb: req.params.userid });
        if (url.length > 0) {
            return res.json(url);
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