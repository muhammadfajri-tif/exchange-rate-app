import { useContext, useEffect } from "react";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import Carousel from "../../components/carousel/Carousel";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import CustomDropdown from "./CustomDropdown";
import "./home.scss";
import { Context } from "../../context/Context";

const Home = () => {
  const { fetchPayload } = useContext(Context);
  useEffect(() => {
    fetchPayload();
  }, [fetchPayload]);

  return (
    <div className="home">
      <div className="box box8">
        <Carousel />
      </div>
      <div className="box box1">
        <TopBox />
      </div>
      <div className="home_chart">
        <div className="box box7">
          <BigChartBox />
        </div>
        <div className="box box7">
          <BigChartBox />
        </div>
        <div className="box box7">
          <BigChartBox />
        </div>
        <div className="box box7">
          <BigChartBox />
        </div>
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="App">
        <h1>Custom Dropdown Select Menu</h1>
        <CustomDropdown />
      </div>
    </div>
  );
};

export default Home;
