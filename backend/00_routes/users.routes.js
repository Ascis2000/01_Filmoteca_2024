
const express = require('express');
const router = express.Router();

// importamos el controlador de usuarios
const usersController = require('../01_controllers/users.controller');

// definimos las rutas para los usuarios
router.get('/', usersController.getAllUsers);        // GET /users
router.get('/:id', usersController.getUserById);     // GET /users/:id
router.post('/', usersController.createUser);        // POST /users
router.put('/:id', usersController.updateUser);      // PUT /users/:id
router.delete('/:id', usersController.deleteUser);   // DELETE /users/:id

module.exports = router;
