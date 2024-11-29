
exports.getAllMovies = `
    SELECT * FROM movies WHERE id_user = $1
`;

exports.createMovie = `
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

exports.updateMovie = `
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
exports.deleteMovie = `
    DELETE FROM movies 
    WHERE id_movie = $1 AND id_user = $2;
`