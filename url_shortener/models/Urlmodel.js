const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UrlSchema = new Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: String,
},
    { timestamps: true }
);

module.exports = mongoose.model('Url', UrlSchema);