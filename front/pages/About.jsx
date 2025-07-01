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
      <p>
        אנחנו חברת בוטיק ייחודית בעמק יזרעאל המתמחה בפיתוח וייצור של מוצרי
        נוטריקוסמטיקה ודרמוקוסמטיקה מתקדמים, המבוססים על מדע, חדשנות וטכנולוגיה.
        החזון שלנו הוא ליצור פתרונות אמיתיים שמבוססים על ידע מחקרי עמוק –
        ומביאים לתוצאות מוכחות בשטח.
      </p>

      {/* תמונה אחרי הפסקה הראשונה */}
      <img
        src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1750954379/about/q9bmvrif4h9sqwq8paqq.jpg"
        alt="תמונה אודות"
        className="about-main-image"
      />

      <p>
        אנו משתפים פעולה עם חברות הטכנולוגיה המובילות בעולם, ומשתמשים
        בטכנולוגיות הולכה פורצות דרך כמו ליפוזומים, אקסוזומים, אינקפסולציה ועוד
        – במטרה להבטיח ספיגה אופטימלית ויעילות קלינית גבוהה של כל רכיב פעיל. כל
        חומרי הגלם נבחרים בקפידה ומבוססים על מחקרים קליניים עדכניים, מתוך
        מחויבות לאיכות, בטיחות ותוצאות נראות לעין.
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
              src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1751368647/Shimrit_BW_tjvd3q.jpg"
              alt="שימרית לב"
            />
            <h3>שימרית לב</h3>
            <h4>מייסדת ומפתחת פורמולות</h4>
            <p>
              עוסקת בפיתוח מוצרים טבעיים מבוססי צמחי מרפא, עם ניסיון קליני של
              למעלה מ־10 שנים.
            </p>
          </div>
          <div className="team-card">
            <img
              src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1751367623/git_BW_kaboyj.jpg"
              alt="גיתית להב"
            />
            <h3>גיתית</h3>
            <h4>יועצת קלינית</h4>
            <p>
              מלווה קליניקות בשילוב מוצרי נייצ'ר וויז בטיפול, התאמה אישית ותמיכה
              מקצועית.
            </p>
          </div>
          <div className="team-card">
            <img
              src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1751368644/Dr_Dorit_zgiotu.jpg"
              alt='ד"ר דורית אבני'
            />
            <h3>ד"ר דורית אבני</h3>
            <h4>קשרי לקוחות</h4>
            <p>
              אחראית על מענה אישי, ליווי לקוחות קצה ותיאום בין הקליניקות
              והמפיצים.
            </p>
          </div>
          <div className="team-card">
            <img
              src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1751368646/Dr_Ariel_mqe5r3.jpg"
              alt='ד"ר איראל פרנקו'
            />
            <h3>ד"ר איראל פרנקו</h3>
            <h4>מייסדת ומפתחת פורמולות</h4>
            <p>
              עוסקת בפיתוח מוצרים טבעיים מבוססי צמחי מרפא, עם ניסיון קליני של
              למעלה מ־10 שנים.
            </p>
          </div>
        </div>
      </div>

      <div className="about-highlight">
        <h2>למי אנחנו כאן?</h2>
        <ul>
          <li>
            <span>מותג פרטי : </span>
            אנו מזמינים מרפאות וקליניקות המעוניינות לשווק מוצרים איכותיים תחת
            שמן להגיש בקשה לשיתוף פעולה. אנו מציעים קו מוצרים ייחודי ומוכח שניתן
            למיתוג פרטי, עם ליווי מקצועי ואישי.
          </li>
          <li>
            <span>מחקר ופיתוח בהתאמה אישית : </span>
            עבור מרפאות השואפות לפתח מוצר בלעדי על שמן – אנו מציעים שירותי R&D
            מלאים, הכוללים פיתוח פורמולציות חדשניות, ניסויים והתאמה מדעית לקהל
            היעד.
          </li>
        </ul>
      </div>

      <div className="about-footer">
        <p>
          בין אם אתם מחפשים מוצרים מוכנים למיתוג או פיתוח פורץ דרך בהתאמה אישית
          – נשמח לבחון יחד את האפשרות ליצור שותפות אמיתית ומקצועית.
        </p>
      </div>
    </div>
  );
}

export default About;
