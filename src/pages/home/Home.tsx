import { useContext, useEffect } from "react";
import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import Carousel from "../../components/carousel/Carousel";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import CustomDropdown from "./CustomDropdown";
import "./home.scss";
import { Context } from "../../context/Context";

const Home = () => {
  const { fetchPayload, payload } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPayload();
      } catch (error) {
        console.error("Failed to fetch payload:", error);
      }
    };

    if (!payload) {
      fetchData();
    }
  }, []);

  return (
    <div className="home">
      <div className="box box8">
        <Carousel />
      </div>
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} />
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
        {/* <div className="App">
          <h1>Custom Dropdown Select Menu</h1>
          <CustomDropdown />
        </div> */}
      </div>
    </div>
  );
};
export default Home;
