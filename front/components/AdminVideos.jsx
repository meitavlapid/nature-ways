import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/UserContext";
import api from "../src/services/api";

function AdminVideos() {
  const { user } = useUser();
  const [videos, setVideos] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/api/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("שגיאה בטעינת סרטונים:", err.message);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      await api.post("/api/videos", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setVideoFile(null);
      fetchVideos();
    } catch (err) {
      console.error("שגיאה בהעלאת וידאו:", err.message);
      alert("שגיאה בהעלאת וידאו");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("למחוק את הסרטון?")) return;
    try {
      await api.delete(`/api/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      fetchVideos();
    } catch (err) {
      console.error("שגיאה במחיקת וידאו:", err.message);
    }
  };

  return (
    <div className="container mt-5" dir="rtl">
      <h2 className="mb-4">ניהול סרטונים</h2>

      <div className="mb-4">
        <label htmlFor="videoFile" className="form-label">
          העלאת סרטון
        </label>
        <input
          type="file"
          accept="video/*"
          className="form-control"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />

        <button
          className="btn btn-success mt-2"
          onClick={handleUpload}
          disabled={uploading || !videoFile}
        >
          {uploading ? "מעלה..." : "+ הוסף וידאו"}
        </button>
      </div>

      <div className="row">
        {videos.map((video) => (
          <div className="col-md-6 mb-3" key={video._id}>
            <div className="card">
              <div className="card-body">
                <video src={video.url} controls width="100%" height="240" />
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDelete(video._id)}
                >
                  מחק
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminVideos;
