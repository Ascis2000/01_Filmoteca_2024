
// importamos el paquete de la base de datos
const { Pool } = require('pg'); 

// configuramos la conexión
const pool = new Pool({
    user: 'usuario',
    host: 'localhost',
    database: 'nombre_de_base_de_datos',
    password: 'contraseña',
    port: 5432,
});

module.exports = pool;
