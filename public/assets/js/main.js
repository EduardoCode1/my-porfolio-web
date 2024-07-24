document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('https://dennis-zepeda.onrender.com/api/contact/send-contact-email', {
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
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
// archivo: script.js
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-certificates-btn');
    const certificatesContainers = document.querySelectorAll('.certificates-container');

    toggleButton.addEventListener('click', function() {
        certificatesContainers.forEach(container => {
            if (container.classList.contains('hidden')) {
                container.classList.remove('hidden');
                toggleButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
                toggleButton.setAttribute('aria-expanded', 'true');
            } else {
                container.classList.add('hidden');
                toggleButton.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
});
