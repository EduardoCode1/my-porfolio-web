document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('https://dennis-zepeda.onrender.com/api/contact/send-contact-email', { // Usa tu dominio aquí
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert('¡Correo electrónico enviado exitosamente!');
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error. Por favor, inténtelo de nuevo más tarde.');
        }
    });
});
fetch('https://dennis-zepeda.onrender.com/test-email')
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Verifica la respuesta en la consola del navegador
    })
    .catch(error => console.error('Error:', error));
