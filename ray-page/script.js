document.addEventListener('DOMContentLoaded', function () {
    // Handle card hover effects
    const cards = document.querySelectorAll('.hover-card');
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

            // Django integration: Send form data to the server using fetch API
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': form.querySelector('[name=csrfmiddlewaretoken]').value
                }
            })
            .then(response => response.json())
            .then(data => {
                // Handle response data
                console.log(data);
                // Optionally, show a success message or redirect the user
            })
            .catch(error => {
                console.error('Error:', error);
                // Optionally, show an error message
            });
        });
    });

    // Django integration ended

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function () {
        const input = this.value.toLowerCase();
        const topics = document.querySelectorAll('#class12 li, #class11 li, #class10 li');

        topics.forEach(topic => {
            const text = topic.textContent.toLowerCase();
            if (text.includes(input)) {
                topic.style.display = '';
            } else {
                topic.style.display = 'none';
            }
        });
    });

    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', function () {
        const menu = document.getElementById('menu');
        menu.classList.toggle('hidden');
    });

    // YouTube-style navbar toggle
    document.getElementById('hamburger-btn').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent event propagation
        const navbar = document.getElementById('youtube-navbar');
        navbar.classList.toggle('open');
    });

    // Close navbar when clicking outside
    document.addEventListener('click', function (event) {
        const navbar = document.getElementById('youtube-navbar');
        const hamburgerBtn = document.getElementById('hamburger-btn');
        if (!navbar.contains(event.target) && !hamburgerBtn.contains(event.target) && !event.target.closest('#youtube-navbar')) {
            navbar.classList.remove('open');
        }
    });

    // Prevent navbar from closing when clicking inside
    document.getElementById('youtube-navbar').addEventListener('click', function (event) {
        event.stopPropagation();
    });
});
module.exports = {
    darkMode: 'class', // or 'media'
    theme: {
      extend: {
        colors: {
          'neutral-light': '#f9fafb',
          'neutral-dark': '#1f2937',
          'primary': '#3b82f6',
          'accent': '#f472b6',
        },
      },
    },
  }
  
