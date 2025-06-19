import React from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

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
  
  

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("שגיאה בטעינת סרטונים:", err));
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">ברוכים הבאים</h1>

      {/* תמונה ראשית */}
      <div className="mb-4 text-center">
        <img
          className="img-fluid rounded shadow"
          src="/images/home.png"
          alt="תמונה ראשית"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>

      {/* שתי תמונות נוספות */}
      <div className="row g-3 mb-5">
        <div className="col-md-6">
          <img
            src="/images/nutri_ home.png"
            className="img-fluid rounded shadow"
            alt="תמונה 2"
          />
        </div>
        <div className="col-md-6">
          <img
            src="/images/dermo_home.png"
            className="img-fluid rounded shadow"
            alt="תמונה 3"
          />
        </div>
      </div>

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
    </div>
  );
}

export default Home;
