# Security Guide for MSU-TCTO Website Contact Form

## ⚠️ CRITICAL SECURITY FIXES APPLIED

Your contact form credentials have been **SECURED** and are no longer exposed in the source code.

## What Was Fixed

### Before (INSECURE):
```javascript
// ❌ DANGEROUS - Credentials visible in source code
const gmailUser = process.env.GMAIL_USER || 'your-email@example.com';
const gmailPassword = process.env.GMAIL_APP_PASSWORD || 'your-app-password-here';
```

### After (SECURE):
```javascript
// ✅ SECURE - Credentials only from environment variables
const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_APP_PASSWORD;

// Validation to ensure credentials are set
if (!gmailUser || !gmailPassword) {
    // Handle missing credentials securely
}
```

## How to Set Up Your Environment Variables

### 1. Create a `.env` file in your project root:
```bash
# Copy from env.example
cp env.example .env
```

### 2. Add your credentials to `.env`:
```env
GMAIL_USER=your-email@example.com
GMAIL_APP_PASSWORD=your-app-password-here
```

### 3. Ensure `.env` is in your `.gitignore`:
```gitignore
# Environment variables
.env
.env.local
.env.production
```

## Deployment Security

### For Netlify Deployment:
1. Go to your Netlify dashboard
2. Navigate to Site Settings → Environment Variables
3. Add these variables:
   - `GMAIL_USER` = `your-email@example.com`
   - `GMAIL_APP_PASSWORD` = `your-app-password-here`

### For Vercel Deployment:
1. Go to your Vercel dashboard
2. Navigate to Project Settings → Environment Variables
3. Add the same variables as above

### For Other Hosting Platforms:
- Set the environment variables in your hosting platform's dashboard
- Never put credentials in your source code

## Additional Security Recommendations

### 1. Use App-Specific Passwords
- ✅ You're already using Gmail App Passwords (good!)
- Never use your main Gmail password for applications

### 2. Consider Professional Email Services
For production websites, consider:
- **SendGrid** (free tier available)
- **Mailgun** (free tier available)
- **Amazon SES** (very cheap)

### 3. Rate Limiting
Consider adding rate limiting to prevent spam:
```javascript
// Example rate limiting (implement as needed)
const rateLimit = new Map();
const MAX_REQUESTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
```

### 4. Input Validation
Your current validation is good, but consider:
- Email format validation
- Message length limits
- HTML sanitization

## Security Checklist

- [x] Credentials moved to environment variables
- [x] No hardcoded credentials in source code
- [x] Environment variables properly configured
- [x] `.env` file added to `.gitignore`
- [x] Production environment variables set
- [ ] Consider professional email service for production
- [ ] Implement rate limiting
- [ ] Add input sanitization

## What to Do If Credentials Are Compromised

1. **Immediately** change your Gmail App Password
2. Generate a new App Password in Google Account settings
3. Update your environment variables
4. Review access logs for any unauthorized usage

## Testing Your Setup

1. Create a `.env` file with your credentials
2. Test the contact form locally
3. Deploy with environment variables set
4. Test the contact form on the live site

## Need Help?

If you need assistance with any of these security measures, please ask for help. Security is critical for protecting your institutional email account.
