// components/ArticleList.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../src/services/api";
import { useUser } from "../hooks/UserContext";
import "../css/ArticleList.css";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("שגיאה בטעינת מאמרים:", err));
  }, []);

  const filtered = searchTag
    ? articles.filter((a) => a.tag?.includes(searchTag))
    : articles;

  const handleDelete = async (id) => {
    if (!window.confirm("האם את בטוחה שברצונך למחוק את המאמר?")) return;
    try {
      await api.delete(`/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("שגיאה במחיקת מאמר:", err);
      alert("שגיאה במחיקה");
    }
  };

  return (
    <div className="article-list">
      <h2>מאמרים</h2>

      <input
        type="text"
        placeholder="חיפוש לפי תגית..."
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        className="tag-search"
      />

      {isAdmin && (
        <div className="text-end mb-3">
          <button
            className="btn btn-success"
            onClick={() => navigate("/addarticles")}
          >
            הוסף מאמר
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <p>לא נמצאו מאמרים</p>
      ) : (
        <ul>
          {filtered.map((article) => (
            <li key={article._id} className="article-item">
              <Link to={`/articles/${article._id}`}>
                <h4>{article.title}</h4>
                <p>{article.summary}</p>
                {article.tag && <small>תגית: {article.tag}</small>}
              </Link>
              {isAdmin && (
                <div className="admin-actions">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => navigate(`/articles/edit/${article._id}`)}
                  >
                    עריכה
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(article._id)}
                  >
                    מחיקה
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArticleList;
