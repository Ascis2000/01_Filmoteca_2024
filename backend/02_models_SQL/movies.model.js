
const pool = require('../05_config/db.config'); 
const moviesQueries = require('../04_queries/movies.queries');

const getAllMovies = async (id_user) => {
    const values = [id_user];

    try {
        const result = await pool.query(moviesQueries.getAllMovies, values);
        return result.rows;  // Retornamos todas las películas del usuario
    } catch (error) {
        console.error("Error en getAllMovies:", error);
        throw error;  // Lanza el error para ser manejado en el controlador
    }
};

const searchMovies = async (id_user, { titulo, director, musica }) => {
    // Preparar valores para la consulta, asignando null si no hay valor
    const values = [
        String(id_user), // Siempre necesario
        titulo ? `%${titulo}%` : null, // Comodín para búsquedas parciales, o null si vacío
        director ? `%${director}%` : null,
        musica ? `%${musica}%` : null,
    ];

    // Construir la consulta
    const query = `
        SELECT * 
        FROM movies 
        WHERE id_user = $1
            AND ($2::TEXT IS NULL OR titulo ILIKE $2)
            AND ($3::TEXT IS NULL OR director ILIKE $3)
            AND ($4::TEXT IS NULL OR musica ILIKE $4);
    `;

    console.log("Query:", query);
    console.log("Values:", values);

    try {
        // Ejecutar la consulta con los valores
        const result = await pool.query(query, values);
        return result.rows; // Devuelve los resultados
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        throw error;
    }
};

const createMovie = async (rbody) => {
    const {
        id_user,
        titulo,
        titulo_original,
        anio,
        director,
        sinopsis,
        musica,
        portada,
        video,
        image_url,
        rating
    } = rbody;

    // Aseguramos que los campos opcionales sean null si no están definidos
    const values = [
        titulo,  // Título de la película (Requerido)
        titulo_original || null,  // Título original (opcional)
        anio,  // Año (Requerido)
        director,  // Director (Requerido)
        sinopsis || null,  // Sinopsis (opcional)
        musica || null,  // Música (opcional)
        portada || null,  // Portada (opcional)
        video || null,  // Video (opcional)
        image_url || null,  // URL de imagen (opcional)
        rating || null,  // Calificación (opcional)
        id_user  // id_user (Requerido)
    ];

    try {
        // Consulta SQL de inserción
        const result = await pool.query(moviesQueries.createMovie, values);
        console.log(result); // Para depuración

        // Devolver la película recién creada
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear la película:', error);
        throw error;
    }
};

const updateMovie = async (reqbody) => {
    const {
        id_movie, // ID de la película que se va a actualizar
        id_user,  // ID del usuario que realiza la operación
        titulo,
        titulo_original,
        anio,
        director,
        sinopsis,
        musica,
        portada,
        video,
        image_url,
        rating
    } = reqbody;

    // Aseguramos que los campos opcionales sean null si no están definidos
    const values = [
        titulo, // $1
        titulo_original || null, // $2
        anio, // $3
        director, // $4
        sinopsis || null, // $5
        musica || null, // $6
        portada || null, // $7
        video || null, // $8
        image_url || null, // $9
        rating || null, // $10
        id_movie, // $11
        id_user  // $12
    ];

    const result = await pool.query(moviesQueries.updateMovie, values);
    return result.rows[0];
};

const deleteMovie = async (id_movie, id_user) => {
    const values = [id_movie, id_user];
    return await pool.query(moviesQueries.deleteMovie, values);
};

module.exports = {
    getAllMovies,
    searchMovies,
    createMovie,
    updateMovie,
    deleteMovie
};
