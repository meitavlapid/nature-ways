const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (to, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // או SMTP אחר
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Nature Ways" <${process.env.EMAIL_USER}>`,
    to,
    subject: "ברוכים הבאים!",
    html: `
      <h2>שלום ${name},</h2>
      <p>תודה שנרשמת ל-Nature Ways! בקרוב תקבל.י תוכן מקצועי ואיכותי.</p>
      <p>נשמח ללוות אותך בדרך לטיפול מדויק ומותאם אישית.</p>
      <br/>
      <strong>צוות Nature Ways</strong>
    `,
  });
};

module.exports = sendWelcomeEmail;
