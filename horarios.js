import express from 'express';
import { turso } from './lib/connect.js';

const router = express.Router();

// Ruta para obtener los horarios disponibles
router.get('/', async (req, res) => {
    try {
        const result = await turso.execute('SELECT * FROM canchas_horario WHERE disponibilidad = 1');
        const rows = result.rows;
        console.log(rows);
        const horarios = rows.map(row => row.horario);
        res.json( horarios );
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});

// Ruta para crear una nueva reserva
router.post('/reservar', async (req, res) => {
    const { usuario_id, cancha_id, horario } = req.body;
    const fecha_actual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:MM:SS
    try {
        // Inserta la nueva reserva en la base de datos
        await turso.execute('INSERT INTO reservas (usuario_id, cancha_id, fecha, horario) VALUES (?, ?, ?, ?)', [usuario_id, cancha_id, fecha_actual, horario]);
        res.status(201).json({ success: true, message: 'Reserva creada exitosamente' });
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});

export default router;