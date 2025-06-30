import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/About.css";

function AboutEdit() {
  const [aboutData, setAboutData] = useState({
    paragraphs: [""],
    imageUrl: "",
    teamMembers: [],
    highlights: [],
    footer: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/about").then((res) => {
      setAboutData(
        res.data || {
          paragraphs: [""],
          imageUrl: "",
          teamMembers: [],
          highlights: [],
          footer: "",
        }
      );
    });
  }, []);

  const handleParagraphChange = (index, value) => {
    const updated = [...aboutData.paragraphs];
    updated[index] = value;
    setAboutData({ ...aboutData, paragraphs: updated });
  };

  const addParagraph = () => {
    setAboutData({ ...aboutData, paragraphs: [...aboutData.paragraphs, ""] });
  };

  const handleHighlightChange = (index, value) => {
    const updated = [...aboutData.highlights];
    updated[index] = value;
    setAboutData({ ...aboutData, highlights: updated });
  };

  const addHighlight = () => {
    setAboutData({ ...aboutData, highlights: [...aboutData.highlights, ""] });
  };

  const handleTeamChange = (index, field, value) => {
    const updatedTeam = [...aboutData.teamMembers];
    updatedTeam[index][field] = value;
    setAboutData({ ...aboutData, teamMembers: updatedTeam });
  };

  const addTeamMember = () => {
    setAboutData({
      ...aboutData,
      teamMembers: [
        ...aboutData.teamMembers,
        { name: "", role: "", bio: "", img: "" },
      ],
    });
  };

  const deleteTeamMember = (index) => {
    const updated = [...aboutData.teamMembers];
    updated.splice(index, 1);
    setAboutData({ ...aboutData, teamMembers: updated });
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/about", aboutData);
      setMessage("השינויים נשמרו בהצלחה ✅");
    } catch {
      setMessage("אירעה שגיאה בשמירה ❌");
    }
  };

  return (
    <div className="about-container">
      <h1>עריכת דף אודות</h1>

      {message && <p>{message}</p>}

      <h2>פסקאות</h2>
      {aboutData.paragraphs.map((para, index) => (
        <textarea
          key={index}
          value={para}
          onChange={(e) => handleParagraphChange(index, e.target.value)}
          rows={4}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
      ))}
      <button onClick={addParagraph}>➕ הוספת פסקה</button>

      <h2>תמונה ראשית</h2>
      <input
        type="text"
        value={aboutData.imageUrl}
        onChange={(e) =>
          setAboutData({ ...aboutData, imageUrl: e.target.value })
        }
        placeholder="קישור לתמונה"
        style={{ width: "100%", marginBottom: "2rem" }}
      />

      <h2>חברי צוות</h2>
      {aboutData.teamMembers.map((member, index) => (
        <div className="team-card" key={index}>
          <input
            type="text"
            placeholder="שם"
            value={member.name}
            onChange={(e) => handleTeamChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="תפקיד"
            value={member.role}
            onChange={(e) => handleTeamChange(index, "role", e.target.value)}
          />
          <textarea
            placeholder="תיאור"
            value={member.bio}
            onChange={(e) => handleTeamChange(index, "bio", e.target.value)}
          />
          <input
            type="text"
            placeholder="קישור לתמונה"
            value={member.img}
            onChange={(e) => handleTeamChange(index, "img", e.target.value)}
          />
          <button onClick={() => deleteTeamMember(index)}>🗑️ הסר</button>
        </div>
      ))}
      <button onClick={addTeamMember}>➕ הוספת חבר צוות</button>

      <h2>רשימת "למי אנחנו כאן"</h2>
      {aboutData.highlights.map((item, index) => (
        <input
          key={index}
          type="text"
          value={item}
          onChange={(e) => handleHighlightChange(index, e.target.value)}
          placeholder="נקודה"
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
      ))}
      <button onClick={addHighlight}>➕ הוספת נקודה</button>

      <h2>פסקת סיום</h2>
      <textarea
        value={aboutData.footer}
        onChange={(e) => setAboutData({ ...aboutData, footer: e.target.value })}
        rows={3}
        style={{ width: "100%", marginTop: "1rem" }}
      />

      <hr style={{ margin: "2rem 0" }} />
      <button onClick={handleSave}>💾 שמירה</button>
    </div>
  );
}

export default AboutEdit;
