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

        // Email configuration
        const recipientEmail = 'msutctocoed@msutcto.edu.ph';
        const emailSubject = `Contact Form: ${subject} - ${name}`;
        
        // Create email content
        const emailContent = `
New contact form submission from MSU-TCTO website:

Name: ${name}
Email: ${email}
Subject: ${subject}
Department: ${department || 'COF'}
Message:
${message}

---
This message was sent from the MSU-TCTO website contact form.
        `.trim();

        // For this implementation, we'll use a simple approach
        // In production, you might want to use a service like:
        // - EmailJS (client-side)
        // - Nodemailer with SMTP
        // - SendGrid
        // - AWS SES
        // - Netlify Forms (if using Netlify)

        // For now, we'll simulate sending the email
        // You can replace this with actual email sending logic
        console.log('Email would be sent to:', recipientEmail);
        console.log('Subject:', emailSubject);
        console.log('Content:', emailContent);

        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Email sent successfully' 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

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
