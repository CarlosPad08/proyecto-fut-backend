//Cambiar require por import
import express from 'express';
import authRoutes from './auth.js';
import { turso } from './lib/connect.js';
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});