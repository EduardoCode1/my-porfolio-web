// backend/controllers/contactController.js
const transporter = require('../utils/mailer'); // Usa el transporte configurado aquí

exports.sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

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
        subject: 'Confirmación de mensaje recibido',
        html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 90%;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #5e17eb;
                        font-size: 24px;
                        margin-bottom: 15px;
                    }
                    p {
                        margin: 0 0 15px;
                        font-size: 16px;
                        color: #555;
                    }
                    img {
                        display: block;
                        width: 100%;
                        max-width: 600px;
                        margin: 20px 0;
                        border-radius: 8px;
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    }
                    ul {
                        list-style-type: none;
                        padding: 0;
                    }
                    li {
                        margin: 10px 0;
                        font-size: 16px;
                    }
                    a {
                        color: #5e17eb;
                        text-decoration: none;
                        font-weight: bold;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 14px;
                        color: #777;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hola ${name},</h1>
                    <img src="https://www.dropbox.com/scl/fi/qb61y17fmdnu6t9wiwapl/gmail-presentacion.png?rlkey=1ww5xut9moo74uvri4wnnzr0l&raw=1" alt="Presentación">
                    <p>Saludos cordiales,</p>
                    <p>Dennis Eduardo Melara Zepeda</p>
                    <p>Conéctate conmigo:</p>
                    <ul>
                        <li><a href="https://www.linkedin.com/in/eduardo-melara-364348312/">LinkedIn</a></li>
                        <li><a href="https://github.com/EduardoCode1">GitHub</a></li>
                        <li><a href="https://www.facebook.com/profile.php?id=100087954971552">Facebook</a></li>
                        <li><a href="https://api.whatsapp.com/qr/VCTRW5OR4QDNA1?autoload=1&app_absent=0">WhatsApp</a></li>
                    </ul>
                    <div class="footer">
                        <p>Si tienes alguna pregunta o necesitas más ayuda, no dudes en comunicarte.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        // Enviar ambos correos electrónicos simultáneamente
        await Promise.all([
            transporter.sendMail(mailOptionsToYou),
            transporter.sendMail(mailOptionsToClient)
        ]);
        res.json({ message: 'Correo electrónico enviado exitosamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al enviar el correo electrónico' });
    }
};
