// backend/server.js
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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ message: 'Servidor está funcionando correctamente' });
});

// Servir archivos estáticos desde el directorio public
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
