// Contact form handler using EmailJS
// This script handles the contact form submission and sends emails directly

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'your_service_id'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'your_template_id'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // Replace with your EmailJS public key

// Initialize EmailJS
(function() {
    // Load EmailJS script if not already loaded
    if (typeof emailjs === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = function() {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        };
        document.head.appendChild(script);
    } else {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Contact form handler
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
            const name = formData.get('entry.757250837') || formData.get('name');
            const email = formData.get('entry.1493463705') || formData.get('email');
            const subject = formData.get('entry.638146523') || formData.get('subject');
            const message = formData.get('entry.1174451292') || formData.get('message');
            const department = formData.get('entry.1918216475') || formData.get('department') || 'COF';

            // Validate form data
            if (!name || !email || !subject || !message) {
                showStatus('Please fill in all required fields.', 'error');
                return;
            }

            // Show loading state
            setLoadingState(true);

            try {
                // Prepare email template parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    department: department,
                    to_email: 'msutctocoed@msutawi-tawi.edu.ph',
                    reply_to: email
                };

                // Send email using EmailJS
                const response = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams
                );

                if (response.status === 200) {
                    showStatus('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Email sending failed');
                }

            } catch (error) {
                console.error('Error sending email:', error);
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
