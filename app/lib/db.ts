import mysql from 'mysql2/promise';

// Konfigurasi koneksi database
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

// Buat koneksi pool
const pool = mysql.createPool(dbConfig);

export default pool;
