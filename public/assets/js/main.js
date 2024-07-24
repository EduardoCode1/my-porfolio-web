document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successMessageModal');
    const okButton = document.getElementById('okButton');
    const closeButton = document.querySelector('.custom-close');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Mostrar el spinner y ocultar el ícono de éxito
            document.getElementById('spinner').style.display = 'block';
            document.getElementById('success-icon').style.display = 'none';

            try {
                const response = await fetch('https://dennis-zepeda.onrender.com/api/contact/send-contact-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, message })
                });

                if (response.ok) {
                    // Ocultar el spinner y mostrar el ícono de éxito
                    document.getElementById('spinner').style.display = 'none';
                    document.getElementById('success-icon').style.display = 'block';
                    
                    // Mostrar el modal de éxito
                    successModal.style.display = 'block';
                } else {
                    throw new Error('Failed to send email');
                }
            } catch (error) {
                console.error('Error:', error);

                // En caso de error, ocultar el spinner
                document.getElementById('spinner').style.display = 'none';
                alert('An error occurred. Please try again later.');
            }
        });
    }

    // Cerrar el modal al hacer clic en el botón OK
    if (okButton) {
        okButton.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
    }

    // Cerrar el modal si el usuario hace clic fuera del modal
    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
    }
});
