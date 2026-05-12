const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
    .then(() => {
        console.log("PostgreSQL Connected Successfully");
    })
    .catch((err) => {
        console.log("Database Connection Error:", err);
    });

module.exports = pool;