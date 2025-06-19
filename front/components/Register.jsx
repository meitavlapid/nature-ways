import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      setMsg("הסיסמה חייבת להכיל לפחות 8 תווים, כולל אות אחת ומספר אחד");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMsg("נרשמת בהצלחה! ניתן להתחבר.");
    } catch (err) {
      setMsg(err.response?.data?.msg || "שגיאה בהרשמה");
    }
  };

  return (
    <div className="container mt-5" dir="rtl">
      <h2>הרשמה</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          name="name"
          placeholder="שם"
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="email"
          type="email"
          placeholder="אימייל"
          onChange={handleChange}
        />

        <div className="input-group my-2">
          <input
            className="form-control"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="סיסמה"
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePassword}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button className="btn btn-primary mt-2">הרשם</button>
      </form>
      {msg && <p className="mt-3 text-danger">{msg}</p>}
    </div>
  );
}

export default Register;
