import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../src/services/api";
import "../css/ArticlePage.css";

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api
      .get(`/api/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.error("שגיאה בטעינת מאמר:", err));
  }, [id]);

  if (!article) return <p>טוען מאמר...</p>;

  return (
    <div className="article-container">
      <h1>{article.title}</h1>
      <p className="summary">{article.summary}</p>
      {article.image && (
        <img src={article.image} alt={article.title} className="main-image" />
      )}

      {article.sections?.map((section, idx) => (
        <div key={idx} className="article-section">
          <h3>{section.subtitle}</h3>
          <p>{section.paragraph}</p>
        </div>
      ))}

      <div className="conclusion">
        <h4>סיכום</h4>
        <p>{article.conclusion}</p>
      </div>

      <div className="bibliography">
        <h4>ביבליוגרפיה</h4>
        <p>{article.bibliography}</p>
      </div>

      {article.tag && <p className="tag">תגית: {article.tag}</p>}
    </div>
  );
}

export default ArticlePage;
