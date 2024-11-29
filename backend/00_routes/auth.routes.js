
const express = require('express');
const router = express.Router();

// importamos el controlador de autenticacion
const authController = require('../01_controllers/auth.controller');

// definimos las rutas para los usuarios
router.get('/register', authController.register);   // GET /register
router.get('/login', authController.login);         // GET /login
router.post('/register', authController.register);  // POST /register
router.post('/login', authController.login);        // POST /register
router.get('/logout', authController.logout);       // PUT /users/:id

const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

/* router.get('/user/dashboard', authMiddleware, authorizeRole('user'), mostrarUser);
router.get('/admin/dashboard', authMiddleware, authorizeRole('admin'), mostrarAdmin); */

module.exports = router;