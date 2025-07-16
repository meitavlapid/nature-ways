import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { baseURL } from "../src/services/api";

import "../css/CustomDevelopment.css";

function CustomDevelopment() {
  return (
    <div className="container  " dir="rtl">
      <h1 className="text-center">מוצרים בפיתוח אישי</h1>

      <div className="bg">
        <p>
          אם תמיד רציתם לרקוח פורמולות משלכם, לייצר מוצרים שלא קיימים אצל
          המתחרים, להביא חדשנות, טכנולוגיות ורכיבים שאין במוצרים אחרים פה בארץ –
          אנחנו פה בשביל לעזור גם בזה.
        </p>
        <p>
          נייצ’ר וויז משמשת גם כזרוע המחקר והפיתוח עבור קליניקות ואנשי מקצוע שיש
          להם חזון וצריכים טיפה עזרה בשביל להוציא אל הפועל.
        </p>
        <p>
          אז אם ישנן פורמולות שתמיד חלמתם לפתח ולייצר עבור הלקוחות שלכם… זה הזמן
          להגשים.
        </p>
        <p className="bold">דברו איתנו</p>

        <a href="/contact" className="btn">
          יצירת קשר
        </a>

        <div className="video">
          <div className="video-container">
            <video
              controls
              src={`${baseURL}/static/home/CustomDevelopment/Tailor-Made formulas.mp4`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomDevelopment;
