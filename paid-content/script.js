document.addEventListener('DOMContentLoaded', function () {
    // Handle alert dismissal
    const alertCloseButton = document.querySelector('.btn-close');
    if (alertCloseButton) {
        alertCloseButton.addEventListener('click', function () {
            const alertBox = alertCloseButton.closest('.alert');
            alertBox.style.display = 'none';
        });
    }
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('nav .container').classList.toggle('show-menu');
    });
    
    // Handle card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseover', function () {
            card.classList.add('hover');
        });
        card.addEventListener('mouseout', function () {
            card.classList.remove('hover');
        });
    });

    // Handle form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Collect form data
            const formData = new FormData(form);

            // Example of where Django integration is needed
            // Send form data to the server using fetch API
            // fetch(form.action, {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'X-CSRFToken': form.querySelector('[name=csrfmiddlewaretoken]').value
            //     }
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Handle response data
            //     console.log(data);
            //     // Optionally, show a success message or redirect the user
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     // Optionally, show an error message
            // });
        });
    });
});

