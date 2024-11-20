import express from 'express';
import cors from 'cors';
import authRoutes from './auth.js';
import registerRoutes from './register.js';
import router from './auth.js';
const app = express();

// Rutas
app.use(express.json());
app.use('/login', authRoutes);
app.use('/register', registerRoutes);

// cors
app.use(cors());
app.use('/api', router)

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});