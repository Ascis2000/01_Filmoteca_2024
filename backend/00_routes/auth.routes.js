
const express = require('express');
const router = express.Router();

// importamos el controlador de autenticacion
const authController = require('../01_controllers/auth.controller');

// definimos las rutas para las autenticaciones
router.get('/register', authController.register);   // GET /register
router.get('/login', authController.login);         // GET /login
router.post('/register', authController.register);  // POST /register
router.post('/login', authController.login);        // POST /register
router.get('/logout', authController.logout);       // PUT /users/:id

module.exports = router;