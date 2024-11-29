
// importamos el paquete de la base de datos
const { Pool } = require('pg'); 

// configuramos la conexión
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // Permite conexiones a certificados no verificados
    },
});

module.exports = pool;
