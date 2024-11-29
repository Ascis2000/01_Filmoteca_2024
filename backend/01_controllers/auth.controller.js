
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../02_models_SQL/users.model');

async function register(req, res) {
    const { nombre, email, password, role = 1 } = req.body;

    // Validar que los campos necesarios no estén vacíos
    if (!nombre || !password || !email) {
        return res.status(400).json({
            message: 'Todos los campos son requeridos: nombre, password, email',
        });
    }

    // Validar que el email tenga un formato correcto
    /* const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: 'El correo electrónico no tiene un formato válido',
        });
    } */

    try {
        // Crear el usuario (en este ejemplo se asume que la función createUser guarda en la base de datos)
        const newUser = await userModel.createUser(nombre, email, password, role);

        // Suponiendo que el nuevo usuario se ha creado correctamente y que newUser tiene el id_user y otros campos
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                id_user: newUser.id_user, // Asegúrate de que newUser tiene el id_user
                nombre: newUser.nombre,   // El nombre del usuario
                email: newUser.email,     // El email del usuario
                role: newUser.role        // El rol del usuario
            }
        });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({
            message: 'Error al registrar el usuario',
            error: error.message
        });
    }
}




async function login(req, res) {
    const { nombre, password } = req.body;  // Usamos 'username' en lugar de 'email'
    
    try {
        // Buscar el usuario por nombre de usuario
        const user = await userModel.findUserByUsername(nombre);  // Buscamos al usuario por el nombre de usuario

        if (user && await bcrypt.compare(password, user.password)) {
            // Si la contraseña es correcta, generar un JWT
            const token = jwt.sign(
                { id: user.id_user, role: user.role },  // Usamos 'id_user' y 'role' desde la base de datos
                process.env.JWT_SECRET,  // La clave secreta para firmar el JWT
                { expiresIn: '1h' }  // El token expira en 1 hora
            );

            // Enviar el token como una cookie segura (opcionalmente, asegurar que sea httpOnly)
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

            // Respondemos con los datos del usuario
            res.json({
                message: 'Login exitoso',
                user: {
                    id_user: user.id_user,
                    nombre: user.nombre,
                    email: user.email,
                    role: user.role
                }
            });
        } else {
            // Si las credenciales no son correctas
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        // Si hay un error durante el proceso
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
}

function logout(req, res) {
    res.clearCookie('token');
    res.redirect('/');
}

const mostrarUser = async (req, res) => {
    try {

        const token = req.cookies.token;

        if (!token) {

        }

        // Decodifica el token (asegúrate de tener la misma clave secreta con la que se generó el token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Extrae el id del token
        const userId = decoded.id;

        const misAds = await adService.getAllAds();

        res.render('userDashboard', { 
            role: 'user',
            userid: userId,
            ads: misAds
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const mostrarAdmin = async (req, res) => {
    try {

        const misAds = await adService.getAllAds();

        res.render('adminDashboard', { 
            role: 'admin',
            ads: misAds
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

module.exports = { register, login, mostrarUser, mostrarAdmin, logout };
