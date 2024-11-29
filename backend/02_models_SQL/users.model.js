
// importamos la configuración de la base de datos y las consultas
const bcrypt = require('bcryptjs');
const db = require('../05_config/db.config');
const queries = require('../04_queries/users.queries');

// obtener todos los usuarios
exports.getAllUsers = async () => {
    try {
        const { rows } = await db.query(queries.getAllUsers);
        return rows;
    } catch (error) {
        throw error;
    }
};

// obtener un usuario por id
exports.getUserById = async (id) => {
    try {
        const { rows } = await db.query(queries.getUserById, [id]);
        return rows[0]; // Retorna el primer usuario encontrado
    } catch (error) {
        throw error;
    }
};

exports.findUserByUsername = async (nombre) => {
    try {
        // Ejecutamos la consulta usando el nombre
        const { rows } = await db.query(queries.findUserByUsername, [nombre]);

        // Retornamos el primer usuario encontrado
        return rows[0]; // Retorna el primer usuario encontrado o undefined si no existe
    } catch (error) {
        throw error;  // Lanza el error si algo sale mal
    }
};

// crear un nuevo usuario
exports.createUser = async (nombre, email, password, role = 1) => {
    try {
        // Encriptar la contraseña antes de almacenarla
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Ejecutar la consulta de inserción en la base de datos
        const result = await db.query(queries.createUser, [nombre, email, hashedPassword, role]);

        // Verifica si la respuesta contiene filas (rows)
        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error('No se pudo registrar el usuario. No se obtuvo una respuesta válida de la base de datos.');
        }

        // Retorna el primer usuario creado
        return result.rows[0];  // Retorna el usuario creado con sus datos
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;  // Lanza el error para que el controlador lo pueda manejar
    }
};

// actualizar un usuario
exports.updateUser = async (nombre, email, id) => {
    try {
        const { rows } = await db.query(queries.updateUser, [nombre, email, id]);
        return rows[0]; // Retorna el usuario actualizado
    } catch (error) {
        throw error;
    }
};

// eliminar un usuario
exports.deleteUser = async (id) => {
    try {
        const { rows } = await db.query(queries.deleteUser, [id]);
        return rows[0]; // Retorna el usuario eliminado
    } catch (error) {
        throw error;
    }
};
