
-- TABLAS
-- Tabla roles
-- Tabla users
-- Tabla movies
-- Tabla cast
-- Tabla rating


---------------
-- Tabla roles
---------------
CREATE TABLE roles (
    id_role SERIAL PRIMARY KEY,
    valor TEXT NOT NULL
);

-- inserts ejemplo
INSERT INTO roles (id_role, valor) VALUES 
(1, 'user'),
(2, 'user premium'),
(3, 'admin');


---------------
-- Tabla users
---------------
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role INTEGER NOT NULL,
    FOREIGN KEY (role) REFERENCES roles(id_role)
        ON DELETE NO ACTION 
        ON UPDATE CASCADE
);

-- inserts ejemplo
INSERT INTO users (nombre, email, password, role) VALUES
('Juan Pérez', 'juan@example.com', 'password123', 1),
('Ana López', 'ana@example.com', 'securepass', 1),
('Carlos García', 'carlos@example.com', 'mypassword', 3);


---------------
-- Tabla movies
---------------
CREATE TABLE movies (
    id_movie SERIAL PRIMARY KEY, 
    titulo TEXT NOT NULL, 
    titulo_original TEXT, 
    anio INTEGER NOT NULL, 
    director TEXT NOT NULL, 
    sinopsis TEXT, 
    musica TEXT, 
    portada TEXT, 
    video TEXT, 
    image_url TEXT, 
    rating INTEGER CHECK(rating BETWEEN 1 AND 10), 
    id_user INTEGER NOT NULL, 
    FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

Explicación de la tabla:
id_movie: Clave primaria de la película
titulo: Título obligatorio de la película
titulo_original: Título original, opcional
anio: Año de estreno, obligatorio
director: Director de la película, obligatorio
sinopsis: Descripción o sinopsis de la película, opcional
musica: Compositor de la música, opcional
portada: Información sobre la portada, opcional
video: Información sobre el video, opcional
image_url: Enlace a la imagen de la película, opcional
rating: Calificación de la película entre 1 y 10
id_user: ID del usuario que ingresó o es dueño de la película, clave foránea que referencia la tabla users

-- inserts ejemplo
INSERT INTO movies (titulo, titulo_original, anio, director, sinopsis, musica, portada, video, image_url, rating, id_user) 
VALUES 
('Aliens, El Regreso', 'Aliens: The Return', 1986, 'James Cameron', 'Sinopsis de Aliens, El Regreso...', 'Música de la película Aliens, El Regreso', 'url_de_portada_aliens', 'url_video_aliens', 'url_imagen_aliens', 8.5, 10);

INSERT INTO movies (titulo, titulo_original, anio, director, sinopsis, musica, portada, video, image_url, rating, id_user) 
VALUES 
('Aliens 3', 'Alien 3', 1992, 'David Fincher', 'Sinopsis de Aliens 3...', 'Música de la película Aliens 3', 'url_de_portada_aliens3', 'url_video_aliens3', 'url_imagen_aliens3', 7.5, 10);

INSERT INTO movies (titulo, titulo_original, anio, director, sinopsis, musica, portada, video, image_url, rating, id_user) 
VALUES 
('Terminator', 'The Terminator', 1984, 'James Cameron', 'Sinopsis de Terminator...', 'Música de la película Terminator', 'url_de_portada_terminator', 'url_video_terminator', 'url_imagen_terminator', 9, 10);


UPDATE movies
SET
    titulo = 'Película actualizada',
    titulo_original = 'Original Movie Title',
    anio = 2023,
    director = 'Director actualizado',
    sinopsis = 'Nueva sinopsis actualizada',
    musica = 'Nueva música',
    portada = 'Nueva portada',
    video = 'Nuevo video',
    image_url = 'https://example.com/nueva-imagen.jpg',
    rating = 4
WHERE
    id_movie = 123 AND id_user = 1
RETURNING *;

---------------
-- Tabla cast
---------------
CREATE TABLE casting (
    id_movie INTEGER NOT NULL, 
    cast_name TEXT NOT NULL, 
    id_user INTEGER NOT NULL, 
    PRIMARY KEY (id_movie, cast_name),
    FOREIGN KEY (id_movie) REFERENCES movies(id_movie) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

-- inserts ejemplo
INSERT INTO casting (id_movie, cast_name, id_user)
VALUES 
(
    (SELECT id_movie FROM movies WHERE titulo = '2001: Odisea del espacio' AND anio = 1968 AND id_user = 11 LIMIT 1), 
    'Keir Dullea', 
    11
);
INSERT INTO casting (id_movie, cast_name, id_user)
VALUES 
(
    (SELECT id_movie FROM movies WHERE titulo = '2001: Odisea del espacio' AND anio = 1968 AND id_user = 11 LIMIT 1), 
    'Gary Lockwood', 
    11
);

---------------
-- Tabla rating
---------------
CREATE TABLE rating (
    id_rating SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    id_movie INTEGER NOT NULL,
    puntuacion NUMERIC(3, 1) NOT NULL CHECK (puntuacion BETWEEN 1 AND 10),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_movie) REFERENCES movies(id_movie)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE (id_user, id_movie)
);

-- inserts ejemplo
INSERT INTO rating (id_user, id_movie, puntuacion) VALUES
(1, 1, 9.5),
(2, 2, 8.0),
(1, 3, 10.0);