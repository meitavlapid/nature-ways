import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
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

const validationSchema = Yup.object({
  name: Yup.string().required("שדה חובה").min(2, "לפחות 2 תווים"),
  email: Yup.string().email("אימייל לא תקין").required("שדה חובה"),
  phone: Yup.string()
    .matches(/^[0-9\s\-+()]*$/, "מספר לא תקין")
    .optional(),
  position: Yup.string().required("יש לבחור תפקיד"),
  interests: Yup.array()
    .min(1, "בחר לפחות תחום אחד")
    .max(5, "ניתן לבחור עד 5 תחומים בלבד"),
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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("/api/register", values);
      alert("נרשמת בהצלחה!");
      resetForm();
    } catch (err) {
      alert("שגיאה: " + (err.response?.data?.msg || "שגיאה כללית"));
    }
  };

  return (
    <div className="register-container" dir="rtl">
      <h2>המממ.. למה אני בכלל צריכ.ה להירשם?</h2>
      <p>
        בדיוק כמו שאת.ה מתאים טיפול למטופל – אנחנו רוצים להתאים תוכן עבורך. כדי
        לעשות את זה בול, נשמח להכיר אותך קצת יותר:
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="section">
              <h4>1. מי את.ה?</h4>
              {roles.map((role) => (
                <label key={role} className="checkbox-label">
                  <Field type="radio" name="position" value={role} />
                  {role}
                </label>
              ))}
              <ErrorMessage
                name="position"
                component="div"
                className="error-text"
              />
            </div>

            <div className="section">
              <h4>2. אילו תחומים מעניינים אותך? (עד 5)</h4>
              {interests.map((interest) => (
                <label key={interest} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={values.interests.includes(interest)}
                    onChange={() => {
                      const selected = values.interests.includes(interest)
                        ? values.interests.filter((i) => i !== interest)
                        : values.interests.length < 5
                        ? [...values.interests, interest]
                        : values.interests;
                      setFieldValue("interests", selected);
                    }}
                  />
                  {interest}
                </label>
              ))}
              <ErrorMessage
                name="interests"
                component="div"
                className="error-text"
              />
            </div>

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
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
