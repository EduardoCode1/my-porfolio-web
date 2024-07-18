// backend/controllers/contactController.js
const nodemailer = require('nodemailer');

// Función para enviar el correo electrónico de contacto
exports.sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    // Configuración del transporte de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Correo electrónico que se enviará a ti
    const mailOptionsToYou = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'Nuevo mensaje de contacto',
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    // Correo electrónico de confirmación para el cliente
    const mailOptionsToClient = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmación de recepción de mensaje',
        text: `Hola ${name},\n\nHe recibido tu correo. Me pondré en contacto contigo lo más rápido posible. Muchas gracias.\n\nSaludos,\nDennis Eduardo Melara Zepeda`
    };

    try {
        // Enviar ambos correos electrónicos simultáneamente
        await Promise.all([
            transporter.sendMail(mailOptionsToYou),
            transporter.sendMail(mailOptionsToClient)
        ]);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};
