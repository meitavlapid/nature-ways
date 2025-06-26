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
    <img src={getImageUrl("home")} alt="תמונה ראשית" />
  )}

  {/* שתי תמונות נוספות */}
  <div className="image-row">
    {getImageUrl("nutri") && (
      <img src={getImageUrl("nutri")} alt="תמונה 2" />
    )}
    {getImageUrl("dermo") && (
      <img src={getImageUrl("dermo")} alt="תמונה 3" />
    )}
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
