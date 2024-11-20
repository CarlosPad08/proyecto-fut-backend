//Cambiar require por import
import express from 'express';
import authRoutes from './auth.js';
import registerRoutes from './register.js';
const app = express();

app.use(express.json());
app.use('/login', authRoutes);
app.use('/register', registerRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});