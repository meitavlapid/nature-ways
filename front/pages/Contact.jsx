import React, { useState } from "react";
import "../css/Contact.css";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // בעתיד אפשר לשלוח את זה לשרת:
      // await axios.post("/api/contact", formData);
      console.log("Form submitted:", formData);
      setStatus("success");
      alert("ההודעה נשלחה בהצלחה!");
      setFormData({ fullname: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error("שגיאה בשליחת הטופס:", err);
      setStatus("error");
    }
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
        <p>
          ☎️ טלפון: <a href="tel:0521234567">052-1234567</a>
        </p>
        <p>
          📧 דוא"ל:{" "}
          <a href="mailto:info@natureways.co.il">info@natureways.co.il</a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="fullname">שם מלא:</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">טלפון:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">אימייל:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">הודעה:</label>
        <textarea
          name="message"
          id="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">שלח</button>
        {status === "success" && (
          <p className="success-message">ההודעה נשלחה בהצלחה!</p>
        )}
        {status === "error" && (
          <p className="error-message">אירעה שגיאה. נסה שוב מאוחר יותר.</p>
        )}
      </form>
    </div>
  );
};

export default Contact;
