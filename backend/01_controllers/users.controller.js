
// importamos el modelo de usuarios
const usersModel = require('../02_models_SQL/users.model');

// GET
// obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// GET
// obtener un usuario por id
const getUserById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await usersModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

// POST
// crear un nuevo usuario
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await usersModel.createUser(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

// PUT
// actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const updatedUser = await usersModel.updateUser(name, email, id);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// DELETE
// eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await usersModel.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};

module.exports = { 
    getAllUsers,
    getUserById,
    createUser, 
    updateUser, 
    deleteUser
};

