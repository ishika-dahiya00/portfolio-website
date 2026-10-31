// =============================================================================
// utils/emailService.js - Email notification service
// =============================================================================

const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendContactNotification(contactData) {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission from ${contactData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4A373;">New Contact Form Submission</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">
                Received on: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      console.log('📧 Contact notification email sent');
    } catch (error) {
      console.error('❌ Email sending failed:', error);
    }
  }

  async sendAutoReply(contactData) {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: contactData.email,
        subject: "Thanks for reaching out! - Ishika",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4A373;">Thank you for your message!</h2>
            <p>Hi ${contactData.name},</p>
            <p>Thank you for reaching out! I've received your message and will get back to you within 24-48 hours.</p>
            <p>In the meantime, feel free to check out my latest work and blog posts on my portfolio.</p>
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>Ishika</strong><br>
              <em>Frontend Developer & UX Designer</em>
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #666;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      console.log('📧 Auto-reply email sent');
    } catch (error) {
      console.error('❌ Auto-reply failed:', error);
    }
  }
}

module.exports = new EmailService();