import React, { useState, useEffect } from "react";
import {
  getPage,
  updatePage,
  uploadImageToGallery,
  deleteImageFromGallery,
} from "../src/services/aboutService";

import { useUser } from "../hooks/UserContext";
import "../css/About.css";

function About() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    getPage("about").then((data) => {
      if (data) {
        if (!Array.isArray(data.teamImages)) {
          data.teamImages = ["", "", ""];
        }
        setContent(data);
      }
    });
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
          {content.img && <img src={content.img} alt="לוגו" width="100" />}
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const uploaded = await uploadImageToGallery(file, "about");
                handleChange("img", uploaded.url);
              }
            }}
          />

          {/* תמונות צוות */}
          <p>תמונות צוות:</p>
          <div className="team-photos-inputs">
            {content.teamImages.map((img, idx) => (
              <div key={idx} className="team-image-item">
                {img && (
                  <img src={img} alt={`חבר צוות ${idx + 1}`} width="80" />
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const uploaded = await uploadImageToGallery(
                        file,
                        "about"
                      );
                      handleImageChange(idx, uploaded.url);
                    }
                  }}
                />

                {img && (
                  <button
                    className="delete-btn"
                    onClick={async () => {
                      const publicId = img.split("/").pop().split(".")[0];
                      await deleteImageFromGallery(publicId);
                      const updated = [...content.teamImages];
                      updated[idx] = "";
                      setContent((prev) => ({ ...prev, teamImages: updated }));
                    }}
                  >
                    🗑
                  </button>
                )}
              </div>
            ))}
          </div>

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

          {content.img && <img src={content.img} alt="לוגו" />}

          <p>{content.paragraph2}</p>
          <p>{content.paragraph3}</p>

          <div className="about-team">
            <p>זה הצוות שגורם לכל הקסם הזה לקרות:</p>
            <div className="team-photos">
              {content.teamImages.map((img, i) =>
                img ? <img key={i} src={img} alt={`חבר צוות ${i + 1}`} /> : null
              )}
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
