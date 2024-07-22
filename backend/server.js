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
    origin: 'https://dennis-zepeda.onrender.com', // Tu dominio en Render
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio public
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
