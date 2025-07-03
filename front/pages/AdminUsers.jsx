import React, { useEffect, useState } from "react";
import api from "../src/services/api";
import { useUser } from "../hooks/UserContext";
import "../css/AdminUsers.css";
import { Trash, ShieldLock } from "react-bootstrap-icons";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("שגיאה בטעינת משתמשים:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (user._id === id) return alert("לא ניתן למחוק את עצמך");
    if (!window.confirm("למחוק את המשתמש?")) return;
    try {
      await api.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      fetchUsers();
    } catch (err) {
      alert("שגיאה במחיקה");
    }
  };

  const handleToggleAdmin = async (id, isAdminNow) => {
    try {
      await api.put(
        `/api/users/${id}/role`,
        { role: isAdmin ? "user" : "admin" },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      fetchUsers();
    } catch (err) {
      alert("שגיאה בשינוי תפקיד");
    }
  };

  return (
    <div className="admin-users container" dir="rtl">
      <h2>ניהול משתמשים</h2>
      {users.length === 0 ? (
        <p>לא נמצאו משתמשים.</p>
      ) : (
        <div className="user-table">
          <div className="table-header">
            <span>שם</span>
            <span>אימייל</span>
            <span>הרשאות</span>
            <span>פעולות</span>
          </div>
          {users.map((u) => (
            <div className="table-row" key={u._id}>
              <span>{u.name}</span>
              <span>{u.email}</span>
              <span>{u.role === "admin" ? "אדמין" : "משתמש"}</span>
              <span className="actions">
                {u._id !== user._id && (
                  <>
                    <button
                      className="btn-admin"
                      onClick={() =>
                        handleToggleAdmin(u._id, u.role === "admin")
                      }
                    >
                      <ShieldLock className="mb-1" />
                      {u.isAdmin ? "הסר אדמין" : "הפוך לאדמין"}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(u._id)}
                    >
                      <Trash className="mb-1" /> מחיקה
                    </button>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
