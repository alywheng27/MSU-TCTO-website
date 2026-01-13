// Contact form handler - Working version
export async function POST({ request }) {
    try {
        console.log('=== CONTACT FORM START ===');
        
        // Get form data
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        console.log('Form data received:', { name, email, subject, message });

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

        // Get Gmail credentials from environment variables
        const gmailUser = import.meta.env.GMAIL_USER || process.env.GMAIL_USER;
        const gmailPassword = import.meta.env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD;
        
        console.log('Credentials check:', {
            user: gmailUser ? 'Set' : 'Not set',
            password: gmailPassword ? 'Set' : 'Not set'
        });
        console.log('Environment variables available:', {
            'import.meta.env.GMAIL_USER': !!import.meta.env.GMAIL_USER,
            'process.env.GMAIL_USER': !!process.env.GMAIL_USER,
            'import.meta.env.GMAIL_APP_PASSWORD': !!import.meta.env.GMAIL_APP_PASSWORD,
            'process.env.GMAIL_APP_PASSWORD': !!process.env.GMAIL_APP_PASSWORD
        });

        if (!gmailUser || !gmailPassword) {
            console.log('⚠️ Gmail credentials not configured');
            console.log('📧 Would send to: michorobledo@msutcto.edu.ph');
            console.log('📝 Subject:', `Contact Form: ${subject} - ${name}`);
            console.log('👤 From:', email);
            console.log('💬 Message:', message);
            console.log('✅ Form submission processed (simulation mode)');
            console.log('🔧 To fix: Create .env file with GMAIL_USER and GMAIL_APP_PASSWORD');
        } else {
            // Send actual email using Gmail SMTP
            console.log('📧 SENDING ACTUAL EMAIL...');
            console.log('To: michorobledo@msutcto.edu.ph');
            console.log('From:', email);
            console.log('Subject:', `Contact Form: ${subject} - ${name}`);
            
            try {
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
                await transporter.verify();
                console.log('✅ SMTP connection verified successfully');

                // Email configuration
                const recipientEmail = 'msutctocoed@msutcto.edu.ph';
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

                // Email options
                const mailOptions = {
                    from: gmailUser,
                    to: recipientEmail,
                    replyTo: email,
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
                const result = await transporter.sendMail(mailOptions);
                console.log('✅ Email sent successfully!');
                console.log('Message ID:', result.messageId);
                console.log('Recipient:', recipientEmail);
                
            } catch (emailError) {
                console.error('❌ Email sending failed:', emailError);
                throw new Error(`Failed to send email: ${emailError.message}`);
            }
        }

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Thank you! Your message has been received and will be processed.' 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: 'Failed to process your message. Please try again.',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
