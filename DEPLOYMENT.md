# Deployment Guide

This document provides instructions for deploying the carpentry portfolio website to a remote server.

## Simple Static Deployment (Recommended)

This method is ideal for deploying to most web hosting providers that provide FTP access and a public_html folder.

1. Build the static site locally:
   ```bash
   # On Windows
   set EXPORT=true && npm run build
   
   # On Linux/Mac
   EXPORT=true npm run build
   ```

2. This will create an `out` directory with all the static files.

3. Use FTP to upload all contents of the `out` directory to your server's `public_html` folder (or equivalent).

4. The site should now be available at your domain (e.g., www.yourdomain.com).

## Email Configuration

For the contact form to work:

1. Create a `.env.local` file on your server with your SMTP settings.

2. If your hosting doesn't support server-side processing, you'll need to:
   - Set up a third-party form service like Formspree, FormSubmit, etc.
   - Or modify the contact form to use your hosting provider's email functionality.

See [EMAIL_SETUP.md](EMAIL_SETUP.md) for detailed email configuration.

## Alternative Deployment Options

### Node.js Server 

If your hosting provider supports Node.js:

1. Upload the entire project (excluding node_modules and .next).
2. Install dependencies on the server:
   ```bash
   npm install --production
   ```
3. Build the project on the server:
   ```bash
   npm run build
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Managed Hosting Services

For easier deployment, consider:

- Vercel (optimized for Next.js)
- Netlify
- GitHub Pages

Each of these will have slightly different deployment procedures but generally involve connecting your Git repository to their service.