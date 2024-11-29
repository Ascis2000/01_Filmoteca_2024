
// obtenemos todos los usuarios
exports.getAllUsers = `
    SELECT * FROM users;
`;

// obtenemos un usuario por id
exports.getUserById = `
    SELECT * FROM users WHERE id_user = $1;
`;

exports.findUserByUsername = `
    SELECT id_user, nombre, email, password, role 
    FROM users 
    WHERE nombre = $1
`

// creamos un nuevo usuario
exports.createUser = `
    INSERT INTO users (nombre, email, password, role)
    VALUES ($1, $2, $3, $4) 
    RETURNING id_user, nombre, email, role;
`;

// actualizar un usuario
exports.updateUser = `
    UPDATE users SET nombre = $1, email = $2 WHERE id_user = $3 RETURNING *;
`;

// eliminar un usuario
exports.deleteUser = `
    DELETE FROM users WHERE id_user = $1 RETURNING *;
`;
