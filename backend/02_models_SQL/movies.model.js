
const pool = require('../05_config/db.config'); 
const moviesQueries = require('../04_queries/movies.queries');

const getAllMovies = async (id_user) => {
    const values = [id_user];

    try {
        const result = await pool.query(moviesQueries.getAllMovies, values);
        return result.rows; 
    } catch (error) {
        console.error("Error en getAllMovies:", error);
        throw error; 
    }
};

const searchMovies = async (id_user, { titulo, director, musica }) => {
    
    const values = [
        String(id_user), 
        titulo ? `%${titulo}%` : null, 
        director ? `%${director}%` : null,
        musica ? `%${musica}%` : null,
    ];

    try {
        const result = await pool.query(moviesQueries.searchMovies, values);
        return result.rows;
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

    const values = [
        titulo,  // (requerido)
        titulo_original || null, 
        anio,  // (requerido)
        director,  // (requerido)
        sinopsis || null, 
        musica || null, 
        portada || null, 
        video || null, 
        image_url || null, 
        rating || null, 
        id_user 
    ];

    try {

        const result = await pool.query(moviesQueries.createMovie, values);
        console.log(result);
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

    // aseguramos que los campos opcionales sean null si no están definidos
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
