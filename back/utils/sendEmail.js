const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    from: `"NatureWays" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html: `
      <h2>היי ${name},</h2>
      <p>ביקשת לאפס את הסיסמה שלך לנייצ'ר וויז?
</p>
      <p>אין בעיה – גם לנו קורה לפעמים לשכוח.
</p>
      <br/>
      <p>לחיצה על הכפתור הבא תיקח אותך למסך שבו תוכלי.ת לאפס את הסיסמה שלך בקלות:
</p>
      <a href="${process.env.CLIENT_URL}/reset-password">אפס סיסמה</a>
    `,
  });
}

module.exports = sendEmail;
