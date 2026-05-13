const express = require('express');
const router = express.Router();

const {
    getHome,
    getHello,
    getTest,
    shortenUrl,
    redirectUrl,
    getUrlStats
} = require('../controllers/urlController');




// routes
router.get('/', getHome);
router.get('/hello', getHello);
router.get('/test', getTest);

// NEW route
router.post('/shorten', shortenUrl);


router.get('/stats/:code', getUrlStats);


module.exports = router;