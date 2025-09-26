# Contact Form Email Setup Guide

This guide explains how to set up direct email sending from the MSU-TCTO contact form. There are two approaches available:

## Approach 1: API Endpoint (Recommended for Development)

The current implementation uses a serverless API endpoint that logs the form data. This is perfect for development and testing.

### Current Setup
- ✅ Form fields updated with standard names
- ✅ API endpoint created at `/api/contact-form`
- ✅ Client-side script handles form submission
- ✅ Success/error messages implemented
- ✅ Thank you modal included

### To Enable Actual Email Sending

You can enhance the API endpoint (`src/pages/api/contact-form.js`) with any of these email services:

#### Option A: Using Nodemailer with SMTP
```bash
npm install nodemailer
```

Then update the API endpoint:
```javascript
import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com', // or your SMTP server
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send email
await transporter.sendMail({
    from: email,
    to: recipientEmail,
    subject: emailSubject,
    text: emailContent
});
```

#### Option B: Using SendGrid
```bash
npm install @sendgrid/mail
```

```javascript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
    to: recipientEmail,
    from: email,
    subject: emailSubject,
    text: emailContent
});
```

#### Option C: Using AWS SES
```bash
npm install @aws-sdk/client-ses
```

#### Option D: Using Resend
```bash
npm install resend
```

## Approach 2: EmailJS (Client-Side)

For a completely client-side solution, you can use EmailJS.

### Setup Steps

1. **Create EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for free account

2. **Configure Email Service**
   - Add your email provider (Gmail, Outlook, etc.)
   - Get your Service ID

3. **Create Email Template**
   - Create template with variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
   - Get your Template ID

4. **Update Configuration**
   - Edit `src/js/contact-form-emailjs.js`
   - Update the constants with your IDs

5. **Switch Scripts**
   - Replace the script in `coed.astro`:
   ```html
   <!-- Replace this line -->
   <script src="../../js/contact-form-api.js"></script>
   
   <!-- With these lines -->
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script src="../../js/contact-form-emailjs.js"></script>
   ```

## Current Form Features

### Form Fields
- **Full Name** (required)
- **Email Address** (required)
- **Subject** (required, dropdown with options)
- **Message** (required)
- **Department** (hidden, set to "COF")

### Form Behavior
- ✅ Client-side validation
- ✅ Loading states with spinner
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ Thank you modal
- ✅ Responsive design

### Email Content
When an email is sent, it will include:
- Sender's full name
- Sender's email address
- Subject line
- Message content
- Department (COF)
- Reply-to address set to sender's email

## Testing

1. **Development Testing**
   - Fill out the form
   - Check browser console for logged email content
   - Verify form validation works

2. **Production Testing**
   - Deploy with email service configured
   - Test form submission
   - Check recipient email (msutctocoed@msutawi-tawi.edu.ph)

## Security Considerations

- ✅ Form validation on both client and server
- ✅ No sensitive data exposed in client code
- ✅ Rate limiting recommended for production
- ✅ CSRF protection can be added if needed

## Environment Variables

For production, set these environment variables:

```env
# For SMTP (Nodemailer)
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-app-password

# For SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key

# For AWS SES
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
```

## Deployment Notes

- The API endpoint will work on any platform that supports serverless functions
- For static hosting, use EmailJS (client-side approach)
- For Netlify, you can also use Netlify Forms
- For Vercel, the API endpoint will work out of the box

## Troubleshooting

### Common Issues

1. **Form not submitting**
   - Check browser console for JavaScript errors
   - Verify API endpoint is accessible
   - Check network tab for failed requests

2. **Emails not being sent**
   - Verify email service configuration
   - Check environment variables
   - Review email service logs

3. **Validation errors**
   - Ensure all required fields are filled
   - Check email format
   - Verify subject is selected

## Support

For technical support:
- Check the browser console for errors
- Review server logs for API issues
- Test with different email services
- Verify form field names match the API expectations
