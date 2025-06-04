# Email Setup for Contact Form

The contact form on this website uses Nodemailer to send emails. To configure it properly:

1. Update the `.env.local` file with your SMTP credentials:

```
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587  # Common ports: 25, 465, 587, 2525
SMTP_SECURE=false  # Set to true for port 465
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=website@yourdomainname.com  # The "from" email address

CONTACT_EMAIL=recipient@example.com  # Where contact form submissions are sent
```

## Email Service Provider Options

Some common SMTP providers you can use:

### Gmail
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```
Note: For Gmail, you may need to use an "app password" if you have 2-factor authentication enabled.

### Outlook/Hotmail
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Mailgun
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
```

## Development Mode

In development mode, emails are not actually sent. Instead, the email content is logged to the console.

## Production Mode

In production mode, emails will be sent according to your SMTP configuration. Make sure to set up your environment variables on your hosting platform.

If you're using Vercel, you can set environment variables in the Vercel dashboard under Project → Settings → Environment Variables.