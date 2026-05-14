const express = require('express');
const app = express();
const cors = require('cors');

const pool = require('./src/config/db');

//Allows server to read JSON data from client//
app.use(express.json());

app.use(cors());

// import routes
const urlRoutes = require('./src/routes/urlRoutes');

// use routes
app.use('/api', urlRoutes);

const { redirectUrl } = require('./src/controllers/urlController');

app.get('/:code', redirectUrl);

// database connection // 
pool.connect()
    .then(() => {
        console.log("PostgreSQL Connected Successfully");
    })
    .catch((err) => {
        console.log("Database Connection Error:", err);
    });




// start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

