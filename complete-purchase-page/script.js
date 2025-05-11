// Simulated function to check payment status
function hasUserPaid() {
    // Here, you can fetch payment status from the server in a real implementation
    return false; // Change to true after a successful payment
}

document.addEventListener('DOMContentLoaded', function () {
    const purchaseSection = document.getElementById('purchaseSection');
    const paymentSection = document.getElementById('paymentSection');
    const payButton = document.getElementById('payButton');

    if (!hasUserPaid()) {
        purchaseSection.classList.add('hidden');
        paymentSection.classList.remove('hidden');
    }

    payButton.addEventListener('click', function () {
        var options = {
            "key": "YOUR_RAZORPAY_KEY", // Enter the Key ID generated from the Dashboard
            "amount": "49900", // Amount is in currency subunits. Default currency is INR. Hence, 49900 means 499 INR
            "currency": "INR",
            "name": "Bhavy Notes",
            "description": "Purchase Premium Content",
            "handler": function (response) {
                // Simulate a successful payment
                console.log(response); // Log the response for debugging

                // Django integration needed here to verify the payment
                // Write a Django view to verify the payment and redirect to this page
                // The view should check the payment status and update the user's account accordingly
                // You can use the Razorpay API to verify the payment
                // Example: https://docs.razorpay.com/docs/verify-payment
                fetch('/verify-payment/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken') // Include CSRF token for Django
                    },
                    body: JSON.stringify(response)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        paymentSection.classList.add('hidden');
                        purchaseSection.classList.remove('hidden');
                    } else {
                        alert('Payment verification failed: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while verifying your payment.');
                });
            },
            "prefill": {
                "name": "Bhavy",
                "email": "bhavy@example.com",
                "contact": "9999999999"
            },
            "theme": {
                "color": "#F59E0B"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    });

    // Function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
