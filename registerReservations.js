import express from 'express';
import { turso } from './lib/connect.js';
//import authenticateToken from './auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { usuario_id, cancha_id, fecha, hora_inicio, hora_fin, estado } = req.body;

    try {
        // Insertar reserva en la base de datos
        await turso.execute(
            'INSERT INTO reservas (usuario_id, cancha_id, fecha, hora_inicio, hora_fin, estado) VALUES (?, ?, ?, ?, ?, ?)',
            [usuario_id, cancha_id, fecha, hora_inicio, hora_fin, estado]
        );

        res.status(201).json({ success: true, message: 'Reserva registrada' });
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});

export default router;