import React, { useEffect, useState } from "react";
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

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios;
    api
      .get("/api/images")
      .then((res) => setImages(res.data))
      .catch((err) => console.error("שגיאה בטעינת תמונות:", err));
  }, []);

  useEffect(() => {
    axios
      .get("/api/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("שגיאה בטעינת סרטונים:", err));
  }, []);

  const getImageUrl = (key) => {
    const image = images.find((img) => img.key === key);
    return image ? image.url : "";
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">ברוכים הבאים</h1>

      {/* תמונה ראשית */}
      <div className="mb-4 text-center">
        {getImageUrl("home") && (
          <img
            className="img-fluid rounded shadow"
            src={getImageUrl("home")}
            alt="תמונה ראשית"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}
      </div>

      {/* שתי תמונות נוספות */}
      <div className="row g-3 mb-5">
        <div className="col-md-6">
          {getImageUrl("nutri") && (
            <img
              src={getImageUrl("nutri")}
              className="img-fluid rounded shadow"
              alt="תמונה 2"
            />
          )}
        </div>
        <div className="col-md-6">
          {getImageUrl("dermo") && (
            <img
              src={getImageUrl("dermo")}
              className="img-fluid rounded shadow"
              alt="תמונה 3"
            />
          )}
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
