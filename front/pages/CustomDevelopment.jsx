import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomDevelopment() {
  return (
    <div className="container py-5" dir="rtl">
      <h1 className="text-center mb-4">מוצרים בפיתוח אישי</h1>

      <div className="row align-items-center mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          {/* החלפת iframe ב־<video> */}
          <div className="shadow rounded-4 overflow-hidden">
            <video
              controls
              className="w-100 rounded-4"
              src="https://res.cloudinary.com/dt5nnq3ew/video/upload/v1750326919/Tailor-Made_formulas_hu1aaz.mp4"
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="bg-light p-4 rounded-4 shadow-sm">
            <p>
              אם תמיד רציתם לרקוח פורמולות משלכם, לייצר מוצרים שלא קיימים אצל
              המתחרים, להביא חדשנות, טכנולוגיות ורכיבים שאין במוצרים אחרים פה
              בארץ – אנחנו פה בשביל לעזור גם בזה.
            </p>
            <p>
              נייצ’ר וויז משמשת גם כזרוע המחקר והפיתוח עבור קליניקות ואנשי מקצוע
              שיש להם חזון וצריכים טיפה עזרה בשביל להוציא אל הפועל.
            </p>
            <p>
              אז אם ישנן פורמולות שתמיד חלמתם לפתח ולייצר עבור הלקוחות שלכם… זה
              הזמן להגשים.
            </p>
            <p className="fw-bold">דברו איתנו.</p>

            <a href="/contact" className="btn btn-primary mt-3">
              יצירת קשר
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomDevelopment;
