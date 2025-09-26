# EmailJS Setup Guide for MSU-TCTO Contact Form

This guide will help you set up EmailJS to enable direct email sending from the contact form on the MSU-TCTO website.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from client-side JavaScript without needing a backend server. It's perfect for static websites like this Astro site.

## Setup Steps

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID**

### 3. Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Template ID:** `contact_form_template`

**Subject:** `Contact Form: {{subject}} - {{from_name}}`

**Content:**
```
New contact form submission from MSU-TCTO website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}
Department: {{department}}
Message:
{{message}}

---
This message was sent from the MSU-TCTO website contact form.
Reply to: {{from_email}}
```

4. Save the template and note down the **Template ID**

### 4. Get Your Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)

### 5. Update the JavaScript Configuration

Edit the file `src/js/contact-form-emailjs.js` and update these values:

```javascript
const EMAILJS_SERVICE_ID = 'your_service_id_here'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'your_template_id_here'; // Replace with your Template ID  
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Replace with your Public Key
```

### 6. Configure Email Template Variables

Make sure your EmailJS template includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Email message
- `{{department}}` - Department (COF)
- `{{to_email}}` - Recipient email (msutctocoed@msutawi-tawi.edu.ph)

## Testing

1. Deploy your website with the updated configuration
2. Fill out the contact form on the website
3. Check the recipient email (msutctocoed@msutawi-tawi.edu.ph) for the message
4. Verify that the email contains all the form data correctly

## Troubleshooting

### Common Issues:

1. **"EmailJS is not defined" error**
   - Make sure the EmailJS script is loaded before the contact form script
   - Check that the CDN link is correct

2. **"Service not found" error**
   - Verify your Service ID is correct
   - Make sure the service is active in your EmailJS dashboard

3. **"Template not found" error**
   - Verify your Template ID is correct
   - Make sure the template is published (not in draft mode)

4. **Emails not being sent**
   - Check your email provider's settings
   - Verify that the recipient email address is correct
   - Check the browser console for error messages

### Debug Mode

To enable debug mode, add this to your contact form script:

```javascript
// Enable debug mode
emailjs.init(EMAILJS_PUBLIC_KEY, {
    debug: true
});
```

## Security Notes

- Never expose your EmailJS private keys in client-side code
- The public key is safe to use in client-side code
- Consider rate limiting to prevent spam
- Monitor your EmailJS usage to stay within free tier limits

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Basic email templates
- Standard support

For higher volumes, consider upgrading to a paid plan.

## Alternative Solutions

If you prefer not to use EmailJS, you can also:

1. **Use Netlify Forms** (if hosting on Netlify)
2. **Use Formspree** (similar to EmailJS)
3. **Set up a backend API** with Nodemailer or similar
4. **Use AWS SES** with a serverless function

## Support

For EmailJS-specific issues:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)

For website-specific issues, contact the development team.
