
const router = require('express').Router();
const Url = require('../models/Urlmodel');
const checkUrl = require('../utils/generateUrl')
router.get('/', (req, res) => {
    res.send('Hello World')
})
router.post('/shortener', async (req, res) => {
    const { longUrl } = req.body;
    try {
        const shortUrl = checkUrl();
        const newUrl = new Url({ longUrl, shortUrl });
        await newUrl.save();
        return res.json({ originalUrl: longUrl, shortUrl: shortUrl });
    } catch (error) {
        return res.status(500).json('Server Error')
    }
})

router.get('/:shortUrl', async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        if (!url) return res.status(404).json({ message: "url not found" })
        const longUrl = url.longUrl.startsWith('http') ? url.longUrl : `http://${url.longUrl}`;
        return res.redirect(longUrl)
    } catch (error) {
        return res.status(500).json('Server Error')
    }
})
module.exports = router;