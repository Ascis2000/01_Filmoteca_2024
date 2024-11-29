
const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv');

// configuramos dotenv para las variables de entorno
dotenv.config();

// Middleware para manejar formularios y datos JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configura los archivos estáticos (CSS y JavaScript del frontend)
app.use(express.static(path.join(__dirname, 'public')));

// importamos el archivo de todas las rutas principales
const apiRoutes = require('./00_routes/routes');
app.use('/api', apiRoutes); // apiRoutes

// importamos el archivo de autenticacion
const authRoutes = require('./00_routes/auth.routes');
app.use('/auth', authRoutes); // authRoutes

// Ejemplo de ruta
app.get('/', (req, res) => {
	res.send('¡Hola, Filmoteca 2024!');
});

const manage404 = require('./middlewares/manage404');

// Para todo el resto de rutas no contempladas
app.use('*', manage404);

// Configura el puerto y ejecuta la aplicación
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});