
// importamos la configuración de la base de datos y las consultas
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

// crear un nuevo usuario
exports.createUser = async (name, email, password) => {
    try {
        const { rows } = await db.query(queries.createUser, [name, email, password]);
        return rows[0]; // Retorna el usuario creado
    } catch (error) {
        throw error;
    }
};

// actualizar un usuario
exports.updateUser = async (name, email, id) => {
    try {
        const { rows } = await db.query(queries.updateUser, [name, email, id]);
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
