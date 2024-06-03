import { useContext, useEffect } from "react";
import Carousel from "../../components/carousel/Carousel";
import CustomDropdown from "./CustomDropdown";
import BarChart from "../../components/barChart/BarChart";
import "./home.scss";
import { Context } from "../../context/Context";
import {singleUser} from '../../data'
import { BarChartSeries } from "../../types/types";

const Home = () => {
  const bankNotes:BarChartSeries = {title:"Bank Notes", banks:[]};
  const eRates:BarChartSeries = {title:"E-Rates", banks:[]};
  const ddTT:BarChartSeries = {title:"DD/TT", banks:[]};
  const specialRates:BarChartSeries = {title:"Special Rates", banks:[]};
  singleUser.forEach(res=>{
    const jenisKurs = res.info.jenis_kurs.split(",").map(res=>res.trim().toLowerCase());
    if (jenisKurs.includes("bank notes")) {
      bankNotes.banks.push(res.title)
    }
    if (jenisKurs.includes("e-rates")) {
      eRates.banks.push(res.title)
    }
    if (jenisKurs.includes("dd/tt")) {
      ddTT.banks.push(res.title)
    }
    if (jenisKurs.includes("special rates")) {
      specialRates.banks.push(res.title)
    }
  })
  
  const { fetchPayload } = useContext(Context);
  useEffect(() => {
    fetchPayload();
  }, [fetchPayload]);

  return (
    <div className="home">
      <div className="box box8">
        <Carousel />
      </div>
      <div className="home_chart">
        <div className="box box7">
          <BarChart barChart={bankNotes}/>
        </div>
        <div className="box box7">
          <BarChart barChart={eRates}/>
        </div>
        <div className="box box7">
          <BarChart barChart={ddTT}/>
        </div>
        <div className="box box7">
          <BarChart barChart={specialRates}/>
        </div>
      </div>
      <div className="App">
        <h1>Custom Dropdown Select Menu</h1>
        <CustomDropdown />
      </div>
    </div>
  );
};

export default Home;
