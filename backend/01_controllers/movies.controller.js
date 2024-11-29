
const moviesModel = require('../models/movies.model');

const getAllMovies = async (req, res) => {
    try {
        // Obtenemos el user_id de los parámetros de la URL
        const { user_id } = req.params;

        // Llamamos a la función en el modelo para obtener las películas del usuario
        const movies = await moviesModel.getAllMovies(user_id);

        // Si se encuentran películas, las enviamos como respuesta
        res.json({ movies });
    } catch (error) {
        // Si hay algún error, lo manejamos y enviamos un mensaje adecuado
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};

const searchMovies = async (req, res) => {
    try {
        const user_id = req.params.id_user;  // El id_user en los parámetros de la URL
        const { titulo, director, genero } = req.query;  // Los parámetros de búsqueda opcionales

        const movies = await moviesModel.searchMovies(user_id, { titulo, director, genero });
        res.json({ movies });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};

module.exports = { 
    getAllMovies,
    searchMovies
 };
