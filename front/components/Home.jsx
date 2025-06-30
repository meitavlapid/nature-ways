import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../src/services/api";
import "../css/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api
      .get("/api/images")
      .then((res) => setImages(res.data))
      .catch((err) => console.error("שגיאה בטעינת תמונות:", err));
  }, []);

  useEffect(() => {
    api
      .get("/api/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("שגיאה בטעינת סרטונים:", err));
  }, []);

  const getImageUrl = (key) => {
    const image = images.find((img) => img.key === key);
    return image ? image.url : "";
  };

  return (
    <div className="container">
      {/* תמונה ראשית */}
      {getImageUrl("home") && (
        <img
          src={getImageUrl("home")}
          alt="תמונה ראשית"
          className="main-image"
        />
      )}
      {/* שתי תמונות נוספות */}
      <div className="image-row">
        {getImageUrl("nutri") && (
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front">
                <img src={getImageUrl("nutri")} alt="תמונה 2" />
              </div>
              <div className="flip-back">
                <span>נוטריקוסמטיקה</span>
              </div>
            </div>
          </div>
        )}
        {getImageUrl("dermo") && (
          <div className="flip-card">
            <div className="flip-inner">
              <div className="flip-front">
                <img src={getImageUrl("dermo")} alt="תמונה 3" />
              </div>
              <div className="flip-back">
                <span>דרמוטולוגיה</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-container">
        <p>עם הזמן הצטברו לא רק מוצרים – גם סיפורים.</p>
        <p>
          אספנו בשבילכם רגעים אמיתיים מהשטח ובחרנו לשתף אתכם בכמה מהם – סרטונים
          אותנטיים שממחישים איך נייצ'ר וויז משתלבת ביום-יום של קליניקות,
          מטפלים ומטופלים.
        </p>

        {/* קרוסלת סרטונים */}
        {videos.length > 0 && (
          <div className="video-carousel">
            <Slider {...settings}>
              {videos.map((video) => (
                <div className="video-slide" key={video._id}>
                  <video controls src={video.url} width="100%" height="400" />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>{" "}
    </div>
  );
}

export default Home;
