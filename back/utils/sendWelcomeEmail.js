const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (to, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // או SMTP אחר
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Nature Ways" <${process.env.MAIL_USER}>`,
    to,
    subject: "ברוכים הבאים לנייצ'ר וויז !",
    html: `
      <h2>היי ${name},</h2>
      <p>שמחים שהצטרפת – מעכשיו אנחנו לגמרי יחד בזה.</p>
      <p>בקרוב יתחילו לנחות אצלך בתיבה תכנים מדויקים, מקצועיים ולגמרי שווים.
</p>
      <br/>
      <p>נשמח ללוות אותך במסע לטיפול טבעי, חכם ומותאם בדיוק לך.
</p>
      <strong>שלך,
      <br/>
צוות נייצ'ר וויז 🌿
</strong>
    `,
  });
};

module.exports = sendWelcomeEmail;
