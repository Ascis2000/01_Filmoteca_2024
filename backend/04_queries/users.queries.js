
// obtenemos todos los usuarios
exports.getAllUsers = `
    SELECT * FROM users;
`;

// obtenemos un usuario por id
exports.getUserById = `
    SELECT * FROM users WHERE id = $1;
`;

// creamos un nuevo usuario
exports.createUser = `
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3) RETURNING *;
`;

// actualizar un usuario
exports.updateUser = `
    UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *;
`;

// eliminar un usuario
exports.deleteUser = `
    DELETE FROM users WHERE id = $1 RETURNING *;
`;
