import express from 'express';
import bcrypt from 'bcryptjs';
import { turso } from './lib/connect.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre, telefono, email, password } = req.body;
    try {
        // Verifica si el usuario ya existe
        const result = await turso.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        const rows = result.rows;
        if (rows.length > 0) {
            return res.status(400).json({ success: false, message: 'El usuario ya existe' });
        }

        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const telefonoInt = Math.floor(Number(telefono));

        // Insertar usuario en la base de datos
        await turso.execute('INSERT INTO usuarios (nombre, telefono, email, contraseña) VALUES (?, ?, ?, ?)', [nombre, telefonoInt, email, hashedPassword]);

        res.status(201).json({ success: true, message: 'Usuario registrado' });
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});

export default router;