import React, { useState } from "react";
import "../css/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // אפשר לשלוח את הנתונים לשרת כאן
    alert("ההודעה נשלחה בהצלחה!");
    setFormData({ fullname: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h2>צור קשר</h2>
      <p>
        נשמח לשמוע מכם! אם יש לכם שאלות, בקשות או שתרצו להזמין מוצרים במיתוג
        אישי – אנחנו כאן בשבילכם.
      </p>
      <div className="contact-info">
        <p>🏢 נייצ’ר וויז – פתרונות מהטבע</p>
        <p>📍 חורש האלונים 12, רמת ישי | חלמיש 14, קיסריה</p>
        <p>📇 ח"פ: 516020898</p>
        <p>☎️ טלפון: 052-1234567</p>
        <p>📧 דוא"ל: info@natureways.co.il</p>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>שם מלא:</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />

        <label>טלפון:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>אימייל:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>הודעה:</label>
        <textarea
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">שלח</button>
      </form>
    </div>
  );
};

export default Contact;
