// Contact form handler using API endpoint
// This script handles the contact form submission using the serverless API

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            const department = formData.get('department') || 'COF';

            // Validate form data
            if (!name || !email || !subject || !message) {
                showStatus('Please fill in all required fields.', 'error');
                return;
            }

            // Show loading state
            setLoadingState(true);

            try {
                // Send form data to API endpoint
                const response = await fetch('/api/contact-cias', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    showStatus('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Failed to send message');
                }

            } catch (error) {
                console.error('Error sending message:', error);
                showStatus('Sorry, there was an error sending your message. Please try again.', 'error');
            } finally {
                setLoadingState(false);
            }
        });
    }

    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            submitText.classList.add('hidden');
            submitSpinner.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            submitSpinner.classList.add('hidden');
        }
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `p-4 rounded-lg mb-6 ${
            type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
            'bg-red-100 text-red-800 border border-red-200'
        }`;
        formStatus.classList.remove('hidden');
        
        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 5000);
    }

    // Modal functionality removed - using simple success message only
});
