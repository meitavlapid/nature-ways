import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../src/services/api";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setMsg("הסיסמאות לא תואמות");

    try {
      const res = await api.post(`/api/auth/reset-password/${token}`, {
        password,
      });
      setMsg("הסיסמה עודכנה בהצלחה!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.msg || "שגיאה באיפוס הסיסמה");
    }
  };

  return (
    <div className="container mt-5" dir="rtl" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">איפוס סיסמה</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="form-control mb-2"
          placeholder="סיסמה חדשה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="אישור סיסמה"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success w-100">
          אפס סיסמה
        </button>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}

export default ResetPassword;
