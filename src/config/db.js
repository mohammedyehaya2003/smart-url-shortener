const { Pool } = require("pg");

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: {
                  rejectUnauthorized: false
              }
          }
        : {
              user: "postgres",
              host: "localhost",
              database: "smart_url_shortener",
              password: "yahya123",
              port: 5432
          }
);

pool.connect()
    .then(() => {
        console.log("PostgreSQL Connected Successfully");
    })
    .catch((err) => {
        console.log("Database Connection Error:", err);
    });

module.exports = pool;