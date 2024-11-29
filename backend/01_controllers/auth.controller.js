
//const { createUser, findUserByUsername } = require('../02_models_SQL/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function register(req, res) {
    const { username, password, email, role = 'user' } = req.body;
    try {
        const newUser = await createUser(username, password, email, role);
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error en el registro');
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (error) {
        res.status(500).send('Error en el inicio de sesión');
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
