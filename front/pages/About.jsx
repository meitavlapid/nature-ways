import React from "react";
import "../css/About.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";

function About() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="container-fluid">
      <h1> הי, נעים להכיר!</h1>
      <div className="about-container">
        <p>
          נייצ'ר וויז היא חברת בוטיק שנולדה בלב הטבע של עמק יזרעאל, ומחברת בין
          עולם הצמחים לידע קליני מדויק.<p></p>
          <p /> ההתמחות שלנו היא בפיתוח וייצור של מוצרי נוטריקוסמטיקה
          ודרמוקוסמטיקה מתקדמים, המבוססים על מדע, חדשנות וטכנולוגיה.
        </p>
        <p>
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
          בטכנולוגיות הולכה פורצות דרך כמו ליפוזומים, אקסוזומים, אינקפסולציה
          ועוד – במטרה להבטיח ספיגה אופטימלית ויעילות קלינית גבוהה של כל רכיב
          פעיל.<p></p> כל חומרי הגלם נבחרים בקפידה ומבוססים על מחקרים קליניים
          עדכניים, מתוך מחויבות לאיכות, בטיחות ותוצאות נראות לעין.
        </p>

        <p>
          יחד עם שותפינו המקצועיים – רופאים, נטורופתים וקוסמטיקאיות רפואיות –
          אנו ממשיכים לחקור, לשפר ולהוביל חדשנות טבעית.
        </p>

        {/* מקטע "מי אנחנו" */}
        <div className="team-section">
          <h1>מי אנחנו</h1>
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
                מלווה קליניקות בשילוב מוצרי נייצ'ר וויז בטיפול, התאמה אישית
                ותמיכה מקצועית.
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
          <h1>למי אנחנו כאן?</h1>
          <ul>
            <li>
              <h4>מותג פרטי : </h4>
              <p>
                אנו מזמינים מרפאות וקליניקות המעוניינות לשווק מוצרים איכותיים
                תחת שמן להגיש בקשה לשיתוף פעולה.
             <br />
                אנו מציעים קו מוצרים ייחודי ומוכח שניתן למיתוג פרטי, עם ליווי
                מקצועי ואישי.
              </p>
            </li>
            <li>
              <h4>מחקר ופיתוח בהתאמה אישית : </h4>
              <p>
              עבור מרפאות השואפות לפתח מוצר בלעדי על שמן – אנו מציעים שירותי R&D
              מלאים, הכוללים פיתוח פורמולציות חדשניות, ניסויים והתאמה מדעית לקהל
              היעד.
              </p>
            </li>
          </ul>
        </div>

        <div className="about-footer">
          <p>
            בין אם אתם מחפשים מוצרים מוכנים למיתוג או פיתוח פורץ דרך בהתאמה
            אישית <br /> נשמח לבחון יחד את האפשרות ליצור שותפות אמיתית ומקצועית.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
