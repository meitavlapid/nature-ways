import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../hooks/UserContext";
import Loader from "../components/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash, Upload } from "react-bootstrap-icons";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ResearchLibrary() {
  const { isAdmin } = useUser();
  const [researchList, setResearchList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const hebrewRegex = /[א-ת]/;

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/research`);
      setResearchList(res.data);
    } catch (err) {
      console.error("שגיאה בקבלת מחקרים:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setError("");
    setSuccess("");

    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);

      if (hebrewRegex.test(file.name)) {
        setError("יש לשנות את שם הקובץ לאנגלית בלבד (ללא אותיות בעברית)");
      } else {
        setSuccess("✔️ שם הקובץ תקין – ניתן להעלות");
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      setError("נא לבחור קובץ ולהזין כותרת");
      return;
    }

    if (hebrewRegex.test(selectedFile.name)) {
      setError("שם הקובץ חייב להיות באנגלית בלבד");
      return;
    }

    const extension = selectedFile.name.split(".").pop();
    const cleanTitle = title
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_\-]/g, "")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");

    const renamedFile = new File([selectedFile], `${cleanTitle}.${extension}`, {
      type: selectedFile.type,
    });

    const formData = new FormData();
    formData.append("pdf", renamedFile);
    formData.append("title", title);

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      let imageUrl = "";

      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile); // ✅ השם חייב להיות בדיוק כמו ב־uploadImage.single("image")

        const imageRes = await axios.post(
          `${API}/api/research/upload-image`,
          imageData
        );

        imageUrl = imageRes.data.imageUrl; // 👈 אל תשכח ש־backend מחזיר { imageUrl }
        formData.append("imageUrl", imageUrl);
      }

      await axios.post(`${API}/api/research/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTitle("");
      setSelectedFile(null);
      setSelectedFileName("");
      setImageFile(null);
      setSuccess("✅ הקובץ הועלה בהצלחה");
      await fetchResearch();
    } catch (err) {
      console.error("שגיאה בהעלאת מחקר:", err);
      setError("שגיאה בהעלאה");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("למחוק את המחקר?")) return;
    try {
      await axios.delete(`${API}/api/research/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setResearchList((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("שגיאה במחיקת מחקר:", err);
    }
  };

  return (
    <div className="container py-5" dir="rtl">
      <h1 className="text-center mb-4">תוכן ומחקר</h1>

      {isAdmin && (
        <div className="text-end mb-4">
          <input
            type="text"
            placeholder="כותרת למחקר (באנגלית בלבד)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control mb-2"
          />
<h5>העלאת מחקר</h5>
          <input
           
            type="file"
            accept=".pdf,.doc,.docx"
            className="form-control mb-2"
            onChange={handleFileSelect}
            disabled={uploading}
          />
          {error && <p className="text-danger small">{error}</p>}
          {success && <p className="text-success small">{success}</p>}

          <h5>העלאת תמונה</h5>
          <input
            type="file"
            accept="image/*"
            className="form-control mb-2"
            onChange={(e) => setImageFile(e.target.files[0])}
            disabled={uploading}
          />

          <button
            onClick={handleUpload}
            className="btn btn-outline-primary"
            disabled={uploading || !selectedFile}
          >
            <Upload className="mb-1" /> אישור העלאה
          </button>

          {uploading && <p className="text-muted mt-2">מעלה קובץ...</p>}
        </div>
      )}

      {loading ? (
        <Loader />
      ) : researchList.length === 0 ? (
        <p className="text-center">אין מחקרים להצגה.</p>
      ) : (
        <div className="row g-4">
          {researchList.map((research) => (
            <div className="col-md-6" key={research._id}>
              <div className="card shadow-sm rounded-4 p-3 h-100">
                <h5 className="mb-3">{research.title || "מסמך"}</h5>

                {research.imageUrl && (
                  <img
                    src={research.imageUrl}
                    alt="תמונה למחקר"
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                )}

                <div className="mb-3">
                  <p>להורדת הקובץ:</p>
                  <a
                    href={research.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={research.title || "מסמך"}
                    className="btn btn-outline-primary btn-sm"
                  >
                    הורדה
                  </a>
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
