
const express = require('express');
const router = express.Router();

// importamos el controlador de usuarios
const moviesController = require('../01_controllers/movies.controller');

const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

/* router.get('/user/dashboard', authMiddleware, authorizeRole('user'), mostrarUser);
router.get('/admin/dashboard', authMiddleware, authorizeRole('admin'), mostrarAdmin); */

// definimos las rutas para los usuarios
router.get('/all/:id_user', moviesController.getAllMovies);        // GET /users
router.get('/search/:id_user', moviesController.searchMovies);     // GET /users/:id
router.post('/create', moviesController.createMovie);        // POST /users
router.put('/update/', moviesController.updateMovie);      // PUT /users/:id
router.delete('/delete/:id', moviesController.deleteMovie);   // DELETE /users/:id

module.exports = router;
