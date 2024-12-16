import express from 'express';
import cors from 'cors';
import authRoutes from './auth.js';
import registerRoutes from './register.js';
import reservesRoutes from './registerReservations.js';

const app = express();

// cors
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/login', authRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/reserves', reservesRoutes);

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});