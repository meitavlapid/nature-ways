import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../src/services/api";
import "../css/RegisterForm.css";

const roles = [
  "רופא.ה",
  "קוסמטיקאית רפואית",
  "בעל.ת קליניקה",
  "מטפל.ת בתחומים משיקים",
  "אחר",
];

const interests = [
  "אנטי-אייג'ינג",
  "בריאות העור",
  "שיקום וצלקות",
  "תוספי תזונה קליניים",
  "טיפול בעור סביב העיניים",
  "טרנדים מחקריים",
  "פתרונות לשיער ונשירות",
  "שילובים של טיפוח חיצוני ופנימי",
  "חדשנות ומוצרים מוכחים קלינית",
];

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    interests: [],
  });

  const handleInterestChange = (interest) => {
    setFormData((prev) => {
      const selected = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : prev.interests.length < 5
        ? [...prev.interests, interest]
        : prev.interests;
      return { ...prev, interests: selected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("תודה! בקרוב נשלח לך תכנים מותאמים 🎯");
      } else {
        alert("שגיאה: " + data.msg);
      }
    } catch (err) {
      alert("שגיאה בשליחה לשרת");
      console.error(err.message);
    }
  };

  return (
    <div className="register-container" dir="rtl">
      <h2>המממ.. למה אני בכלל צריכ.ה להירשם?</h2>
      <p>
        בדיוק כמו שאת.ה מתאים טיפול למטופל – אנחנו רוצים להתאים תוכן עבורך. כדי
        לעשות את זה בול, נשמח להכיר אותך קצת יותר:
      </p>

      <form onSubmit={handleSubmit}>
        <div className="section">
          <h4>1. מי את.ה?</h4>
          {roles.map((role) => (
            <label key={role} className="checkbox-label">
              <input
                type="radio"
                name="role"
                value={role}
                checked={formData.role === role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
              {role}
            </label>
          ))}
        </div>

        <div className="section">
          <h4>2. אילו תחומים מעניינים אותך? (עד 5)</h4>
          {interests.map((interest) => (
            <label key={interest} className="checkbox-label">
              <input
                type="checkbox"
                value={interest}
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
              />
              {interest}
            </label>
          ))}
        </div>

        <div className="section">
          <label>שם מלא *</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label>אימייל *</label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <label>טלפון (לא חובה)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        <button type="submit" className="submit-button">
          יאללה תתאימו לי תוכן
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
