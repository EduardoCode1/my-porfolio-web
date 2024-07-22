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

// Middleware para parsear JSON y URL encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta para las API
app.use('/api/contact', contactRoutes);

// Ruta para archivos estáticos y frontend
app.get('*', (req, res) => {
  // Verificar si el archivo solicitado existe
  const filePath = path.join(__dirname, '../frontend', req.path === '/' ? 'index.html' : req.path);
  
  // Enviar el archivo si existe, de lo contrario, responder con error 404
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('404 Not Found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
