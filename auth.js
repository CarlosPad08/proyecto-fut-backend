import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { turso } from './lib/connect.js';

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await turso.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        const rows = result.rows;
        if (rows.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }
        const user = rows[0];
        const isPasswordValid = await password == user.contraseña ? true : false;
        console.log(password, user.contraseña, isPasswordValid);
        if (!isPasswordValid) {
            return res.status(400).send('Contraseña incorrecta');
        }
        const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).send('Error del servidor');
    }
});

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    try {
        const verified = jwt.verify(token, 'secret_key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Token no válido');
    }
};

// Ruta protegida
router.get('/protected', authenticateToken, (req, res) => {
    res.send('Acceso a ruta protegida');
});

export default router;