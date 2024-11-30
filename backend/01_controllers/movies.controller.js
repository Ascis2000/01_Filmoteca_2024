
const moviesModel = require('../02_models_SQL/movies.model');

const getAllMovies = async (req, res) => {
    try {
        // Obtenemos el user_id de los parámetros de la URL
        const { id_user } = req.params;

        // Llamamos a la función en el modelo para obtener las películas del usuario
        const movies = await moviesModel.getAllMovies(id_user);

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
        const id_user = req.params.id_user; // user_id en los parámetros de la URL
        
        // Obtener los parámetros de la consulta (titulo, director, musica)
        const { titulo, director, musica } = req.query; 

        // Llamar al modelo con los parámetros
        const movies = await moviesModel.searchMovies(id_user, { titulo, director, musica });
        console.log(movies)
        // Responder con las películas encontradas
        res.json({ movies });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las peliculas' });
    }
};

const createMovie = async (req, res) => {
    try {
        console.log(req.body)
        const newMovie = await moviesModel.createMovie(req.body); // Pasa el cuerpo de la solicitud
        res.status(201).json(newMovie);  // Devuelve la película creada
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la película' });
    }
};

const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await moviesModel.updateMovie(req.body); // Aquí usa req.body para acceder al id_movie
        console.log("updatedMovie", updatedMovie);
        res.status(200).json(updatedMovie);
    } catch (error) {
        console.error("Error al actualizar la película:", error);
        res.status(500).json({ error: 'Error al actualizar la película' });
    }
};

const deleteMovie = async (req, res) => {
    const { id } = req.params; // id_movie
    const { id_user } = req.body; // id_user

    if (!id_user) {
        return res.status(400).json({ error: 'El id_user es obligatorio para esta operación.' });
    }

    try {
        const result = await moviesModel.deleteMovie(id, id_user);

        if (result.rowCount === 0) {
            // No se encontró ninguna película con ese id para el usuario
            return res.status(404).json({ error: 'Película no encontrada o no pertenece al usuario.' });
        }

        res.json({ message: 'Película eliminada correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la película.' });
    }
};

module.exports = { 
    getAllMovies,
    searchMovies,
    createMovie,
    updateMovie,
    deleteMovie
 };
