
const express = require('express');
const router = express.Router();

// USUARIOS
const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);

// MOVIES
const moviesRoutes = require('./movies.routes');
router.use('/movies', moviesRoutes);

module.exports = router;