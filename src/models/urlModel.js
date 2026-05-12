const pool = require("../config/db");
let urlDatabase = {};


const saveUrl = (code, originalUrl, expiryMinutes = null) => {
    const expiryTime = expiryMinutes
        ? Date.now() + expiryMinutes * 60 * 1000
        : null;

    urlDatabase[code] = {
        originalUrl,
        clicks: 0,
        expiryTime
    };
};

const getUrl = (code) => {
    const data = urlDatabase[code];

    if (!data) return null;

    // check expiry
    if (data.expiryTime && Date.now() > data.expiryTime) {
        delete urlDatabase[code]; // optional cleanup
        return null;
    }

    data.clicks++;
    return data.originalUrl;
};


const getStats = (code) => {
    return urlDatabase[code];
};


// it will store the all shortcode and original link in the db// 
const saveUrlToDB = async (shortCode, originalUrl) => {
    const query = `
        INSERT INTO urls (short_code, original_url)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [shortCode, originalUrl];

    const result = await pool.query(query, values);

    return result.rows[0];
};


// get the shortcode from the postgresql // 
const getUrlFromDB = async (shortCode) => {

    const query = `
        SELECT * FROM urls
        WHERE short_code = $1
    `;

    const values = [shortCode];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const incrementClicks = async (shortCode) => {

    const query = `
        UPDATE urls
        SET clicks = clicks + 1
        WHERE short_code = $1
    `;

    const values = [shortCode];

    await pool.query(query, values);
};



module.exports = { saveUrl, getUrl, getStats, saveUrlToDB, getUrlFromDB, incrementClicks};