import React from "react";
import "../css/About.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";

function About() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="about-container">
      <h1>אודות נייצ'ר וויז</h1>
      {user?.role === "admin" && (
        <button onClick={() => navigate("/about/edit")}>עריכה</button>
      )}
      <p>
        אנחנו מאמינים בכוחו של הטבע לשקם, לרפא ולחזק. נייצ'ר וויז נולדה מתוך
        שילוב של מחקר מדעי מתקדם עם חכמת הצמחים – במטרה להציע פתרונות טיפוליים,
        קוסמטיים ותזונתיים בהתאמה אישית.
      </p>

      {/* תמונה אחרי הפסקה הראשונה */}
      <img
        src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1750954379/about/q9bmvrif4h9sqwq8paqq.jpg"
        alt="תמונה אודות"
        className="about-main-image"
      />

      <p>
        אנו מפתחים פורמולות ייחודיות בשיתוף קליניקות מובילות, מתוך הקשבה אמיתית
        לצורכי המטופלים והמטפלות. כל מוצר מבית נייצ'ר וויז נועד להעניק תוצאה
        מורגשת – מבפנים ומבחוץ.
      </p>

      <p>
        יחד עם שותפינו המקצועיים – רופאים, נטורופתים וקוסמטיקאיות רפואיות – אנו
        ממשיכים לחקור, לשפר ולהוביל חדשנות טבעית.
      </p>

      {/* מקטע "מי אנחנו" */}
      <div className="team-section">
        <h2>מי אנחנו</h2>
        <div className="team-cards">
          <div className="team-card">
            <img
              src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1750954390/about/wmlmihojs4zgihzdvfht.jpg"
              alt="רותם"
            />
            <h3>רותם</h3>
            <h4>מייסדת ומפתחת פורמולות</h4>
            <p>
              עוסקת בפיתוח מוצרים טבעיים מבוססי צמחי מרפא, עם ניסיון קליני של
              למעלה מ־10 שנים.
            </p>
          </div>
          <div className="team-card">
            <img
              src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1750954387/about/kv0z4rdwpurtybweukwq.jpg"
              alt="מיטל"
            />
            <h3>מיטל</h3>
            <h4>יועצת קלינית</h4>
            <p>
              מלווה קליניקות בשילוב מוצרי נייצ'ר וויז בטיפול, התאמה אישית ותמיכה
              מקצועית.
            </p>
          </div>
          <div className="team-card">
            <img
              src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1750954381/about/n5mtkp0f1apwwlofki1h.jpg"
              alt="נועה"
            />
            <h3>נועה</h3>
            <h4>קשרי לקוחות</h4>
            <p>
              אחראית על מענה אישי, ליווי לקוחות קצה ותיאום בין הקליניקות
              והמפיצים.
            </p>
          </div>
        </div>
      </div>

      <div className="about-highlight">
        <h2>למי אנחנו כאן?</h2>
        <ul>
          <li>קליניקות אסתטיקה רפואית</li>
          <li>מטפלים קוסמטיים</li>
          <li>מרכזים לבריאות ואורח חיים</li>
          <li>לקוחות המחפשים פתרונות מדויקים מהטבע</li>
        </ul>
      </div>

      <div className="about-footer">
        <p>נייצ'ר וויז – שותפים לדרך בריאה, טבעית ומדויקת יותר.</p>
      </div>
    </div>
  );
}

export default About;
