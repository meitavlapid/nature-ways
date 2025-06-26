import React, { useState, useEffect } from "react";
import { getPage, updatePage } from "../src/services/aboutService";

import { useUser } from "../hooks/UserContext";
import "../css/About.css";

function About() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPage("about").then(setContent);
  }, []);

  const handleChange = (key, value) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (index, value) => {
    const updated = [...content.teamImages];
    updated[index] = value;
    setContent((prev) => ({ ...prev, teamImages: updated }));
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      updatePage("about", content);
    }
    setIsEditing(!isEditing);
  };

  if (!content) return <div>טוען...</div>;

  return (
    <div className="about">
      {isEditing ? (
        <>
          <input
            type="text"
            value={content.heading}
            onChange={(e) => handleChange("heading", e.target.value)}
          />
          <textarea
            value={content.paragraph1}
            onChange={(e) => handleChange("paragraph1", e.target.value)}
          />
          <textarea
            value={content.paragraph2}
            onChange={(e) => handleChange("paragraph2", e.target.value)}
          />
          <textarea
            value={content.paragraph3}
            onChange={(e) => handleChange("paragraph3", e.target.value)}
          />

          {/* לוגו */}
          <input
            type="text"
            value={content.img}
            onChange={(e) => handleChange("img", e.target.value)}
          />

          {/* תמונות צוות */}
          <p>תמונות צוות:</p>
          {content.teamImages.map((img, idx) => (
            <input
              key={idx}
              type="text"
              value={img}
              onChange={(e) => handleImageChange(idx, e.target.value)}
              placeholder={`קישור תמונה ${idx + 1}`}
            />
          ))}

          <textarea
            value={content.tagline}
            onChange={(e) => handleChange("tagline", e.target.value)}
          />
          <button onClick={handleToggleEdit}>שמור</button>
        </>
      ) : (
        <>
          <h1>{content.heading}</h1>
          <p>{content.paragraph1}</p>

          <img src={content.img} alt="לוגו" />

          <p>{content.paragraph2}</p>
          <p>{content.paragraph3}</p>

          <div className="about-team">
            <p>זה הצוות שגורם לכל הקסם הזה לקרות:</p>
            <div className="team-photos">
              {content.teamImages.map((img, i) => (
                <img key={i} src={img} alt={`חבר צוות ${i + 1}`} />
              ))}
            </div>
          </div>

          <blockquote className="tagline">{content.tagline}</blockquote>
          {user?.role === "admin" && (
            <button onClick={handleToggleEdit}>ערוך</button>
          )}
        </>
      )}
    </div>
  );
}

export default About;
