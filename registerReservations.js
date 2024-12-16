import express from 'express';
import { turso } from './lib/connect.js';
//import authenticateToken from './auth.js';

const router = express.Router();

const getNextReservaId = async () => {
    try {
        const result = await turso.execute('SELECT MAX(reserva_id) as maxId FROM reservas');
        const maxId = result.rows[0].maxId;
        return maxId ? maxId + 1 : 1;
    } catch (err) {
        console.error('Error al obtener el próximo reserva_id:', err);
        throw new Error('Error al obtener el próximo reserva_id');
    }
};

router.post('/', async (req, res) => {
    const { reserva_id, usuario_id, cancha_id, fecha, hora_inicio, hora_fin, estado } = req.body;

    try {
        const reserva_id = await getNextReservaId();

        // Insertar reserva en la base de datos
        await turso.execute(
            'INSERT INTO reservas (reserva_id, usuario_id, cancha_id, fecha, hora_inicio, hora_fin, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [reserva_id, usuario_id, cancha_id, fecha, hora_inicio, hora_fin, estado]
        );

        //Cambiar la disponibilidad de la cancha
        await turso.execute(
            'UPDATE canchas_horario SET disponibilidad = 0 WHERE cancha_id = ? AND horario_inicio = ?',
            [cancha_id, hora_inicio]
        );

        res.status(201).json({ success: true, message: 'Reserva registrada' });
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).json({ success: false, message: 'Error del servidor de reservas' });
    }
});

export default router;