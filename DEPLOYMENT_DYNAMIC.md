# Dynamic Deployment Guide

This document provides instructions for deploying the carpentry portfolio website with dynamic features (i18n translations and dynamic portfolio) to your existing server and domain.

## Deploying to Your Existing Server

### Prerequisites
- Node.js installed on your server (v14+ recommended)
- SSH access to your server
- Your domain already configured to point to your server

### Deployment Steps

1. **Build the application locally**:
   ```bash
   npm run build
   ```
   
2. **Transfer files to your server** using SCP, SFTP, or rsync:
   ```bash
   # Example using rsync
   rsync -avz --exclude node_modules --exclude .git ./ user@your-server:/path/to/website/
   ```
   
   Or if you prefer to use Git:
   ```bash
   # On your server
   cd /path/to/website
   git pull origin main
   ```

3. **Install dependencies on the server**:
   ```bash
   cd /path/to/website
   npm install --production
   ```

4. **Create environment variables** in a `.env` file:
   ```
   # Email configuration
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_smtp_username
   SMTP_PASSWORD=your_smtp_password
   CONTACT_EMAIL=recipient@example.com
   ```

5. **Configure the web server**:

   ### Using PM2 (recommended)
   
   Install PM2 if not already installed:
   ```bash
   npm install -g pm2
   ```
   
   Start your Next.js application:
   ```bash
   cd /path/to/website
   pm2 start npm --name "carpentry-portfolio" -- start
   ```
   
   Configure PM2 to start on server boot:
   ```bash
   pm2 startup
   pm2 save
   ```

   ### Nginx Configuration
   
   Create or update your Nginx configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;  # Default Next.js port
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Enable and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

   ### HTTPS Configuration (recommended)
   
   Install Certbot:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

## Updating the Site

To update your live site:

1. Make changes locally and test
2. Build locally: `npm run build`
3. Transfer the updated files to your server using the same method as initial deployment
4. Restart the application:
   ```bash
   cd /path/to/website
   pm2 restart carpentry-portfolio
   ```

## Dynamic Features

With this deployment method:

### i18n Support
- Users can switch between English and French languages
- Content is served in the appropriate language based on user selection
- URL paths reflect the selected language

### Dynamic Portfolio
- Project pages are generated dynamically
- New projects can be added by updating the content files
- Portfolio filtering and organization works as expected