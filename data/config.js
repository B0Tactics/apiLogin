const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'b0tactics.cpgkeaoy8uoh.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'b0tactics2019',
    database: 'mydb',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;