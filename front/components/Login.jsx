import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../hooks/UserContext";
import api from "../src/services/api";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();
  const [showModal, setShowModal] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/api/auth/login", form);
      console.log("🔐 תגובת התחברות:", res.data);

      login(res.data.token);
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.msg || "שגיאה בהתחברות");
    }
  };

  return (
    <div className="container mt-5" dir="rtl" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">התחברות למערכת</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            אימייל
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            סיסמה
          </label>
          <div className="input-group">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              onChange={handleChange}
              required
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
        </div>

        <button type="submit" className="btn btn-success w-100">
          התחבר
        </button>
      </form>

      {msg && <div className="alert alert-danger mt-3">{msg}</div>}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => setShowModal(true)}
          style={{ fontSize: "0.9rem" }}
        >
          שכחת סיסמה?
        </button>
        <Link
          to="/register"
          className="text-secondary"
          style={{ fontSize: "0.9rem" }}
        >
          אין לך חשבון? הירשם עכשיו
        </Link>
      </div>

      <ForgotPasswordModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default Login;
