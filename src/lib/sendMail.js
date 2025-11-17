import nodemailer from "nodemailer";

async function sendMail({ to, subject, html }) {
  try {
    // Create transporter using your email service
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., "smtp.gmail.com"
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // your email password or app password
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: `CodeNergy Notifications`,
      to, // comma-separated emails or array
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export default sendMail;
