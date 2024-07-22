document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const spinner = document.getElementById('spinner');
    const checkmark = document.getElementById('checkmark');
    
    spinner.style.display = 'block';
    checkmark.style.display = 'none';
    
    fetch('http://localhost:5000/api/contact/send-contact-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        spinner.style.display = 'none';
        if (data.message === 'Email sent successfully') {
            checkmark.style.display = 'block';
        } else {
            alert('Failed to send email. Please try again later.');
        }
    })
    .catch(error => {
        spinner.style.display = 'none';
        alert('An error occurred. Please try again later.');
        console.error('Error:', error);
    });
});
