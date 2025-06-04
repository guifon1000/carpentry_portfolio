import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, message } = req.body;

    // Validate form data
    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a transport for nodemailer
    // For production, you'd use real SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'your-email@example.com',
        pass: process.env.SMTP_PASSWORD || 'your-password',
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || 'website@carpentryportfolio.com',
      to: process.env.CONTACT_EMAIL || 'info@carpentryportfolio.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${service}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Service: ${service}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // For development without actual email sending
    if (process.env.NODE_ENV !== 'production') {
      console.log('Email would be sent in production:');
      console.log(mailOptions);
      return res.status(200).json({ success: true, demo: true });
    }

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}