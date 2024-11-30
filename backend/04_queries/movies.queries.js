
const getAllMovies = `
    SELECT * FROM movies WHERE id_user = $1
`;

const searchMovies = `
    SELECT * 
    FROM movies 
    WHERE id_user = $1
        AND ($2::TEXT IS NULL OR titulo ILIKE $2)
        AND ($3::TEXT IS NULL OR director ILIKE $3)
        AND ($4::TEXT IS NULL OR musica ILIKE $4);
`;

const createMovie = `
    INSERT INTO movies (
        titulo, 
        titulo_original, 
        anio, 
        director, 
        sinopsis, 
        musica, 
        portada, 
        video, 
        image_url, 
        rating, 
        id_user
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
`

const updateMovie = `
    UPDATE movies
    SET
        titulo = $1,
        titulo_original = $2,
        anio = $3,
        director = $4,
        sinopsis = $5,
        musica = $6,
        portada = $7,
        video = $8,
        image_url = $9,
        rating = $10
    WHERE
        id_movie = $11 AND id_user = $12
    RETURNING *;
`
const deleteMovie = `
    DELETE FROM movies 
    WHERE id_movie = $1 AND id_user = $2;
`

module.exports = {
    getAllMovies,
    searchMovies,
    createMovie,
    updateMovie,
    deleteMovie
};
