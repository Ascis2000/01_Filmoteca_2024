
// endpoint raiz para movies
const API_URL_MOVIES = "http://localhost:3000/api/movies";

const getAllMovies = async (uID) => {
    try {
        const userId = uID;
        const response = await fetch(`${API_URL_MOVIES}/all/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`Error fetching movies: ${response.statusText}`);
        }

        const data = await response.json();
        return data.movies;
    } catch (error) {
        console.error("Error en getAllMovies:", error);
        throw error;
    }
};

const serviceMovies = {
    getAllMovies,
    //deleteMovie,
};

export default serviceMovies;