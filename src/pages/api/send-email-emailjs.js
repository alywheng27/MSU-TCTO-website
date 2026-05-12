// Server-side EmailJS proxy — dev-only; configure env + rate limits before enabling in production.

import { notFoundUnlessDev } from '../../lib/api-guards.js';
import { rateLimitJsonResponse } from '../../lib/spam-guard.js';

export async function POST({ request }) {
    try {
        const denied = notFoundUnlessDev();
        if (denied) return denied;

        const tooMany = rateLimitJsonResponse('emailjs-proxy', request, 20, 3_600_000);
        if (tooMany) return tooMany;

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

        const EMAILJS_SERVICE_ID = String(process.env.EMAILJS_SERVICE_ID || '').trim();
        const EMAILJS_TEMPLATE_ID = String(process.env.EMAILJS_TEMPLATE_ID || '').trim();
        const EMAILJS_PUBLIC_KEY = String(process.env.EMAILJS_PUBLIC_KEY || '').trim();

        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            return new Response(JSON.stringify({ success: false, error: 'EmailJS is not configured' }), {
                status: 503,
                headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
            });
        }

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
