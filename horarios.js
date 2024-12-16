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

export default router;