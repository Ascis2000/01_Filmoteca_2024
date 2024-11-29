
// movies.model.js

const pool = require('../05_config');  // Asegúrate de que estás importando correctamente tu pool de base de datos

const getAllMovies = async (user_id) => {
    const query = 'SELECT * FROM movies WHERE id_user = $1';
    const values = [user_id];  // Aquí estamos pasando el user_id como un parámetro a la consulta

    try {
        const result = await pool.query(query, values);
        return result.rows;  // Retornamos todas las películas del usuario
    } catch (error) {
        console.error("Error en getAllMovies:", error);
        throw error;  // Lanza el error para ser manejado en el controlador
    }
};

module.exports = { getAllMovies };
