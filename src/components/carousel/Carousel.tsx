import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";
import { Context } from "../../context/Context";

const Carousel: React.FC = () => {
  const { tips, carouseLoading: loading } = useContext(Context);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {tips.map((tip, index) => (
          <div key={index} className="carousel-slide">
            <div className="carousel-content">
              <p>"{tip}"</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
