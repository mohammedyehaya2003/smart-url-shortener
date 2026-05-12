const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "smart_url_shortener",
    password: "yahya123",
    port: 5432,
});

module.exports = pool;