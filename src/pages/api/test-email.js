// Test endpoint for email functionality
// This helps verify your Gmail setup is working correctly

export async function GET({ request }) {
    try {
        // Check if environment variables are set
        const gmailUser = process.env.GMAIL_USER;
        const gmailPassword = process.env.GMAIL_APP_PASSWORD;
        
        if (!gmailUser || !gmailPassword) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Gmail credentials not configured',
                details: {
                    userSet: !!gmailUser,
                    passwordSet: !!gmailPassword
                }
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Test email configuration
        const nodemailer = await import('nodemailer');
        
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: gmailUser,
                pass: gmailPassword
            }
        });

        // Verify SMTP connection
        await transporter.verify();
        
        return new Response(JSON.stringify({
            success: true,
            message: 'Gmail configuration is working correctly',
            details: {
                user: gmailUser,
                connectionVerified: true
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Gmail test error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: 'Gmail configuration test failed',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
