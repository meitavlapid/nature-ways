import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../hooks/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash, Upload } from "react-bootstrap-icons";

function ResearchLibrary() {
  const { isAdmin } = useUser();
  const [researchList, setResearchList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/research");
      setResearchList(res.data);
    } catch (err) {
      console.error("שגיאה בקבלת מחקרים:", err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("pdf", file);
    setUploading(true);
    try {
      await axios.post("http://localhost:5000/api/research/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await fetchResearch();
    } catch (err) {
      console.error("שגיאה בהעלאת מחקר:", err);
      alert("שגיאה בהעלאה");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("למחוק את המחקר?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/research/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setResearchList((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("שגיאה במחיקת מחקר:", err);
    }
  };
  console.log("טוקן:", localStorage.getItem("token"));

  return (
    <div className="container py-5" dir="rtl">
      <h1 className="text-center mb-4">תוכן ומחקר</h1>

      {isAdmin && (
        <div className="text-end mb-4">
          <label className="btn btn-outline-primary">
            <Upload className="mb-1" /> העלאת מחקר חדש
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              hidden
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {researchList.length === 0 ? (
        <p className="text-center">אין מחקרים להצגה.</p>
      ) : (
        <div className="row g-4">
          {researchList.map((research) => (
            <div className="col-md-6" key={research._id}>
              <div className="card shadow-sm rounded-4 p-3 h-100">
                <h5 className="mb-3">{research.title || "מסמך מחקר"}</h5>
                <div className="ratio ratio-4x3 mb-3">
                  <iframe
                    src={research.fileUrl}
                    title="research-pdf"
                    frameBorder="0"
                  ></iframe>
                </div>
                {isAdmin && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(research._id)}
                  >
                    <Trash className="mb-1" /> מחיקה
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResearchLibrary;
