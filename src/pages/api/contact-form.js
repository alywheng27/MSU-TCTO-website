// Contact form handler using Gmail SMTP
// This serverless function sends emails using your institutional Gmail account

import { loadEnv } from 'vite';

export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const { name, email, subject, message } = Object.fromEntries(formData);

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
        const recipientEmail = 'msutctocoed@msutawi-tawi.edu.ph';
        const emailSubject = `Contact Form: ${subject} - ${name}`;
        
        // Create email content
        const emailContent = `
New contact form submission from MSU-TCTO website:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}

---
This message was sent from the MSU-TCTO website contact form.
Reply to: ${email}
        `.trim();

        // Debug: Log form data to ensure it's captured correctly
        console.log('=== CONTACT FORM DATA ===');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Subject:', subject);
        console.log('Message:', message);
        console.log('========================');
        
        // Load environment variables
        const env = loadEnv('development', process.cwd(), '');
        
        // Get credentials from environment variables (secure)
        const gmailUser = env.GMAIL_USER || process.env.GMAIL_USER;
        const gmailPassword = env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD;
        
        // Debug environment variables
        console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
        console.log('env.GMAIL_USER:', env.GMAIL_USER ? 'Set' : 'Not set');
        console.log('env.GMAIL_APP_PASSWORD:', env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set');
        console.log('process.env.GMAIL_USER:', process.env.GMAIL_USER ? 'Set' : 'Not set');
        console.log('process.env.GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set');
        console.log('Final gmailUser:', gmailUser ? 'Set' : 'Not set');
        console.log('Final gmailPassword:', gmailPassword ? 'Set' : 'Not set');
        console.log('=====================================');
        
        // Validate that credentials are set
        if (!gmailUser || !gmailPassword) {
            console.error('Missing Gmail credentials in environment variables');
            console.error('Available env vars:', Object.keys(env));
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'Email service configuration error. Please contact the administrator.' 
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        console.log('Using Gmail User:', gmailUser);
        console.log('Using App Password:', gmailPassword ? 'Set' : 'Not set');
        
        // Send email using Gmail SMTP
        const nodemailer = await import('nodemailer');
        
        // Create transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: gmailUser,
                pass: gmailPassword
            }
        });

        // Test SMTP connection
        try {
            await transporter.verify();
            console.log('SMTP connection verified successfully');
        } catch (verifyError) {
            console.error('SMTP verification failed:', verifyError);
            throw new Error(`SMTP connection failed: ${verifyError.message}`);
        }

        // Email options
        const mailOptions = {
            from: gmailUser, // Your institutional Gmail
            to: recipientEmail,
            replyTo: email, // So you can reply directly to the sender
            subject: emailSubject,
            text: emailContent,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2c5aa0;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> MSU-TCTO Website Contact Form</p>
                    
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    
                    <div style="background-color: #fff; padding: 20px; border-left: 4px solid #2c5aa0;">
                        <h3>Message:</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <hr style="margin: 30px 0;">
                    <p style="color: #666; font-size: 12px;">
                        This message was sent from the MSU-TCTO website contact form.<br>
                        You can reply directly to this email to respond to ${name}.
                    </p>
                </div>
            `
        };

        // Send the email
        try {
            const result = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', result.messageId);
            
            return new Response(JSON.stringify({ 
                success: true, 
                message: 'Thank you! Your message has been sent successfully.' 
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (sendError) {
            console.error('Email sending failed:', sendError);
            throw new Error(`Failed to send email: ${sendError.message}`);
        }

    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: 'Failed to send your message. Please try again.' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
