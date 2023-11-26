const mongoose = require('mongoose');
const qrSchema = new mongoose.Schema({
    userIdFb: String,
    longUrl: String,
    shortQRUrl: String,
    urlCode: String,
    qrCode: String,
    date: { type: String, default: Date.now },
    visitCount: {
        type: Number,
        default: 0,
    },
});
module.exports = mongoose.model('Qrs', qrSchema);