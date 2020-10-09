const Pool = require('pg').Pool;
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const pool = new Pool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

// open the PGSQL connection
pool.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = pool;