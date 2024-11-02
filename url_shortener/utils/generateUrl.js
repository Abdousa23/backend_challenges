const Url = require('../models/Urlmodel');
const generateUrl = () => {
    const baseUrl = 'https://urlsh.com';
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${randomString}`;
};
const checkUrl = async () => {
    const shortUrl = generateUrl();
    const url = await Url.findOne({ shortUrl });
    if (url) checkUrl();
    else return shortUrl;
}
module.exports = generateUrl, checkUrl;