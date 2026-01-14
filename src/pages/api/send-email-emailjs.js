// This is a server-side implementation using EmailJS
// You'll need to install: npm install @emailjs/browser

export async function POST({ request }) {
    try {
        const { name, email, subject, message, department } = await request.json();

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'Missing required fields' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // EmailJS configuration
        // You'll need to set these up in your EmailJS account
        const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'your_service_id';
        const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || 'your_template_id';
        const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'your_public_key';

        // Email template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            department: department || 'COF',
            to_email: 'msutctocoed@msutcto.edu.ph'
        };

        // Send email using EmailJS
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: EMAILJS_SERVICE_ID,
                template_id: EMAILJS_TEMPLATE_ID,
                user_id: EMAILJS_PUBLIC_KEY,
                template_params: templateParams
            })
        });

        if (response.ok) {
            return new Response(JSON.stringify({ 
                success: true, 
                message: 'Email sent successfully' 
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            throw new Error('EmailJS API error');
        }

    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: 'Failed to send email' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
