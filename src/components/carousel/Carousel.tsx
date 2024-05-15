import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";
import { getResponse } from "../../config/gemini"; // Adjust the import based on your project structure

const Carousel: React.FC = () => {
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contextJson = {
          exchange_rates: {
            USD: {
              SGD: { buying: 15.97373, selling: 16.13427 },
              AUD: { buying: 10.54106, selling: 10.65346 },
              EUR: { buying: 17.18933, selling: 17.36854 },
              JPY: { buying: 0.14429, selling: 0.14571 },
              GBP: { buying: 21.975, selling: 22.175 },
              CNY: { buying: 2.456, selling: 2.476 },
            },
          },
        };

        const prompt =
          "ini adalah kursdollar bank mandiri: " +
          JSON.stringify(contextJson) +
          " tolong berikan tips-tips insight dari kursdollar bank mandiri";

        const response = await getResponse(prompt);
        const data = JSON.parse(response);
        const cleanedTips = data.tips.map((tip: string) =>
          tip.replace(/\*\*/g, "")
        ); // Remove ** from tips
        setTips(cleanedTips);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Failed to fetch data:", error);
        await fetchData(); // Retry fetching data if failed
      }
    };

    fetchData();
  }, []);

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
