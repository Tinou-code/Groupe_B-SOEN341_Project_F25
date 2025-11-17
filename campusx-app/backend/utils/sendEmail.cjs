const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

    return { success: true, info };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

module.exports = sendEmail;
