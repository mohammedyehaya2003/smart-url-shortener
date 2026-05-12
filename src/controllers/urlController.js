// controllers/urlController.js


const {
    saveUrl,
    getUrl,
    getStats,
    saveUrlToDB,
    getUrlFromDB,
    incrementClicks
} = require("../models/urlModel");


const getHome = (req, res) => {
    res.send('Server is running 🚀');
};

const getHello = (req, res) => {
    res.send('Hello API working 🚀');
};

const getTest = (req, res) => {
    res.send('Test route working');
};


const shortenUrl = async (req, res) => {
    try {
        console.log("POST /api/shorten hit");

        console.log("BODY:", req.body);

        const { originalUrl, customCode, expiryMinutes } = req.body;

        if (!originalUrl || !originalUrl.startsWith("http")) {
            return res.status(400).json({
                message: "Invalid URL"
            });
        }

        // generate short code
        const shortCode =
            customCode || Math.random().toString(36).substring(2, 8);

        // temporary memory storage
        saveUrl(shortCode, originalUrl, expiryMinutes);

        // database storage
        await saveUrlToDB(shortCode, originalUrl);

        res.json({
            message: "Short URL created",
            shortCode,
            expiryMinutes: expiryMinutes || "No expiry"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Database error",
            error: error.message
        });
    }
};



const redirectUrl = async (req, res) => {
    const code = req.params.code;

    console.log("Fetching code:", code);

    const data = await getUrlFromDB(code);

    const originalUrl = data?.original_url;

    

    if (!originalUrl) {
        return res.status(404).json({
            message: "URL not found"
        });
    }

    // increment the clicks // 
    await incrementClicks(code);


    // ✅ SAFE REDIRECT
    if (!originalUrl.startsWith("http")) {
        return res.status(400).json({
            message: "Invalid stored URL"
        });
    }

    res.redirect(originalUrl);
};

const getUrlStats = (req, res) => {
    const code = req.params.code;

    const data = getStats(code);

    if (!data) {
        return res.status(404).json({
            message: "No data found"
        });
    }

    res.json({
        shortCode: code,
        originalUrl: data.originalUrl,
        clicks: data.clicks
    });
};



module.exports = {
    getHome,
    getHello,
    getTest,
    shortenUrl,
    redirectUrl,
    getUrlStats
};