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

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

// Ruta de la API
app.use('/api/contact', contactRoutes);

// Ruta para favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assets/img/favicon.ico'));
});

// Ruta principal para el frontend
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, '../public', req.path === '/' ? 'index.html' : req.path);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(`Error serving file: ${err}`);
      res.status(404).send('404 Not Found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
