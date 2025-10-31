const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://test-inventory-app.netlify.app', // URL del frontend React local
    /^https:\/\/.*\.ngrok\.io$/, // Permitir todas las URLs de ngrok
    /^https:\/\/.*\.ngrok-free\.app$/ // Permitir URLs de ngrok gratuitas
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Inventarios funcionando' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

