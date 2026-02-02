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

                // Email configuration - Multiple recipients
                const recipientEmails = [
                    'law.tawitawicampus@msumain.edu.ph','mikeemaruhom@msutcto.edu.ph'
                    // Add more email addresses here if needed
                    // 'second.email@example.com',
                ];
                const emailSubject = `Contact Form: ${subject} - ${name}`;

                // Escape HTML for safe rendering in email
                const escapeHtml = (str) => String(str || '')
                    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                const safeName = escapeHtml(name);
                const safeEmail = escapeHtml(email);
                const safeSubject = escapeHtml(subject);
                const safeMessage = escapeHtml(message);
                
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

                // Base URL for hosted assets (logo must use absolute URL for email clients)
                const siteUrl = 'https://msutcto.edu.ph';
                const logoUrl = `${siteUrl}/images/msutcto_wordmark_magenta_.png`;

                // Email options - Professional branded template
                const mailOptions = {
                    from: gmailUser,
                    to: recipientEmails, // Can be array or comma-separated string
                    replyTo: email,
                    subject: emailSubject,
                    text: emailContent,
                    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form - MSU-TCTO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f7;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;">
          <!-- Header with logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 32px 40px; text-align: center;">
              <img src="${logoUrl}" alt="MSU-TCTO" style="max-width: 280px; height: auto; display: inline-block;" width="280" />
              <p style="color: #a8b2d1; font-size: 12px; margin: 16px 0 0 0; letter-spacing: 0.5px;">Mindanao State University - Tawi-Tawi College of Technology and Oceanography</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px 40px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <div style="display: inline-block; background: linear-gradient(135deg, #C41E5E 0%, #9e1850 100%); color: #fff; font-size: 11px; font-weight: 600; padding: 6px 14px; border-radius: 20px; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 24px;">New Inquiry</div>
                    <h1 style="color: #1a1a2e; font-size: 24px; font-weight: 600; margin: 0 0 8px 0; line-height: 1.3;">Contact Form Submission</h1>
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 28px 0;">A visitor has submitted a message through the College of Law contact form.</p>
                    
                    <!-- Sender details card -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <p style="margin: 0 0 12px 0; font-size: 13px;"><strong style="color: #475569; min-width: 70px; display: inline-block;">Name</strong><span style="color: #1e293b;">${safeName}</span></p>
                          <p style="margin: 0 0 12px 0; font-size: 13px;"><strong style="color: #475569; min-width: 70px; display: inline-block;">Email</strong><a href="mailto:${safeEmail}" style="color: #C41E5E; text-decoration: none;">${safeEmail}</a></p>
                          <p style="margin: 0; font-size: 13px;"><strong style="color: #475569; min-width: 70px; display: inline-block;">Subject</strong><span style="color: #1e293b;">${safeSubject}</span></p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Message -->
                    <p style="color: #475569; font-size: 12px; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                    <div style="background-color: #ffffff; padding: 20px 24px; border-radius: 8px; border-left: 4px solid #C41E5E; border: 1px solid #e2e8f0; border-left: 4px solid #C41E5E;">
                      <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
                This message was sent from the <strong>MSU-TCTO website</strong> (College of Law contact form).
              </p>
              <p style="color: #475569; font-size: 13px; margin: 0; line-height: 1.5;">
                <strong>Kindly contact the client at the email address provided above:</strong><br>
                <a href="mailto:${safeEmail}" style="color: #C41E5E; text-decoration: none; font-weight: 600;">${safeEmail}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
                    `
                };

                // Send the email
                const result = await transporter.sendMail(mailOptions);
                console.log('✅ Email sent successfully!');
                console.log('Message ID:', result.messageId);
                console.log('Recipients:', recipientEmails.join(', '));
                
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
