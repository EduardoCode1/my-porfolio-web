require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contact.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración CORS
app.use(cors({
  origin: '*', // Permitir todas las solicitudes
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Middleware para registrar solicitudes
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Error en el servidor' });
});

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de la API
app.use('/api/contact', contactRoutes);

// Ruta de prueba para verificar el estado del servidor
app.get('/test', (req, res) => {
  res.json({ message: 'Servidor está funcionando correctamente' });
});

// Ruta para verificar el correo electrónico
app.get('/test-email', (req, res) => {
  res.json({ message: 'Ruta de prueba de correo electrónico funcionando' });
});

// Capturar todas las demás rutas y servir el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
