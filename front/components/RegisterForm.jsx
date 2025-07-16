import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../css/RegisterForm.css";
import api from "../src/services/api";

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

const validationSchema = Yup.object({
  name: Yup.string().required("שדה חובה").min(2, "לפחות 2 תווים"),
  email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
  phone: Yup.string()
    .matches(/^[0-9\s\-+()]*$/, "מספר לא תקין")
    .optional(),
  position: Yup.string().required("יש לבחור תפקיד"),
  interests: Yup.array()
    .min(1, "בחר לפחות תחום אחד")
    .max(9, "ניתן לבחור עד 9 תחומים "),
  password: Yup.string().min(6, "לפחות 6 תווים").required("סיסמה חובה"),
});

function RegisterForm() {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position: "",
    interests: [],
    password: "",
  };
  const [submitted, setSubmitted] = useState(false);
  const [isCustomRole, setIsCustomRole] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 4000); 

      return () => clearTimeout(timer);
    }
  }, [submitted, navigate]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await api.post("/api/auth/register", values);

      setSubmitted(true); 
      resetForm();
    } catch (err) {
      alert("שגיאה: " + (err.response?.data?.msg || "שגיאה כללית"));
    }
  };
  const handleInterestChange = (interest, values, setFieldValue) => {
    const selected = values.interests.includes(interest)
      ? values.interests.filter((i) => i !== interest)
      : values.interests.length < 9
      ? [...values.interests, interest]
      : values.interests;

    setFieldValue("interests", selected);
  };
  return (
    <div className="containe-fluid mt-5 mb-5 " dir="rtl">
      {!submitted ? (
        <>
          <h1>המממ.. למה אני בכלל צריכ.ה להירשם?</h1>

          <div className="container">
            <p>
              בדיוק כמו שאת.ה מתאימ.ה טיפול למטופל - אנחנו רוצים להתאים תוכן
              עבורך.
              <br />
              כדי לעשות את זה בול, נשמח להכיר אותך קצת יותר:
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => {
                const isCustomRole = values.position === "";

                return (
                  <Form>
                    <fieldset className="section">
                      <legend className="section-title">מי את.ה?</legend>

                      <div className="grid-options">
                        {roles.map((role) => (
                          <label key={role} className="checkbox-label">
                            <input
                              type="radio"
                              name="roleSelector"
                              value={role}
                              checked={
                                role === "אחר"
                                  ? values.position &&
                                    !roles.includes(values.position)
                                  : values.position === role
                              }
                              onChange={() => {
                                if (role === "אחר") {
                                  setFieldValue("position", ""); // מכין להזנת טקסט חופשי
                                } else {
                                  setFieldValue("position", role); // ערך מתוך הרשימה
                                }
                              }}
                            />
                            {role}
                          </label>
                        ))}
                      </div>

                      {/* תיבת טקסט רק אם נבחר "אחר" */}
                      {!roles.includes(values.position) && (
                        <div className="mt-2">
                          <label>אנא ציין.י את התפקיד שלך:</label>
                          <input
                            type="text"
                            name="position"
                            className="form-control"
                            value={values.position}
                            onChange={(e) =>
                              setFieldValue("position", e.target.value)
                            }
                            placeholder="הקלד.י כאן..."
                          />
                        </div>
                      )}

                      <ErrorMessage
                        name="position"
                        component="div"
                        className="error-text"
                      />
                    </fieldset>

                    <fieldset className="section">
                      <legend className="section-title">
                        אילו תחומים מעניינים אותך?
                      </legend>
                      <div className="grid-options">
                        {interests.map((interest) => (
                          <label key={interest} className="checkbox-label">
                            <input
                              type="checkbox"
                              name="interests"
                              value={interest}
                              checked={values.interests.includes(interest)}
                              onChange={() =>
                                handleInterestChange(
                                  interest,
                                  values,
                                  setFieldValue
                                )
                              }
                            />
                            {interest}
                          </label>
                        ))}
                      </div>
                      <ErrorMessage
                        name="interests"
                        component="div"
                        className="error-text"
                      />
                    </fieldset>

                    <div className="section">
                      <label>שם מלא *</label>
                      <Field type="text" name="name" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error-text"
                      />

                      <label>אימייל *</label>
                      <Field type="email" name="email" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-text"
                      />

                      <label>טלפון (לא חובה)</label>
                      <Field type="tel" name="phone" />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="error-text"
                      />

                      <label>סיסמה *</label>
                      <Field type="password" name="password" />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-text"
                      />
                    </div>

                    <button type="submit" className="submit-button">
                      יאללה תתאימו לי תוכן
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </>
      ) : (
        <div className="thank-you-message">
          <h2>תודה על ההרשמה 💚</h2>
          <p className="thank-you-text mt-3 mb-3 text-center">
            הטופס נשלח בהצלחה! בקרוב תקבל.י מאיתנו תכנים מותאמים במיוחד עבורך.
          </p>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
