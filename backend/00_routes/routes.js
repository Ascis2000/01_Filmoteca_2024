
const express = require('express');
const router = express.Router();

// importamos las rutas de cada tabla

/* const moviesRoutes = require('./movies.routes');
const tagsRoutes = require('./tags.routes');
const commentsRoutes = require('./comments.routes');
const sessionsRoutes = require('./sessions.routes'); */

// Definimos las rutas
const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);
/* router.use('/movies', moviesRoutes);
router.use('/tags', tagsRoutes);
router.use('/comments', commentsRoutes);
router.use('/sessions', sessionsRoutes); */

module.exports = router;