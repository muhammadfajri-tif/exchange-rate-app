import Carousel from "../../components/carousel/Carousel";
// import CustomDropdown from "./CustomDropdown";
import BarChart from "../../components/barChart/BarChart";
import "./home.scss";
import { singleUser } from "../../data";
import { BarChartSeries } from "../../types/types";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { getResponse } from "../../config/gemini";
import Table from "../../components/table/Table";

const Home = () => {
  const bankNotes: BarChartSeries = { title: "Bank Notes", banks: [] };
  const eRates: BarChartSeries = { title: "E-Rates", banks: [] };
  const ddTT: BarChartSeries = { title: "DD/TT", banks: [] };
  const specialRates: BarChartSeries = { title: "Special Rates", banks: [] };
  singleUser.forEach((res) => {
    const jenisKurs = res.info.jenis_kurs
      .split(",")
      .map((res) => res.trim().toLowerCase());
    if (jenisKurs.includes("bank notes")) {
      bankNotes.banks.push(res.title);
    }
    if (jenisKurs.includes("e-rates")) {
      eRates.banks.push(res.title);
    }
    if (jenisKurs.includes("dd/tt")) {
      ddTT.banks.push(res.title);
    }
    if (jenisKurs.includes("special rates")) {
      specialRates.banks.push(res.title);
    }
  });

  const {
    tips,
    setTips,
    carouseLoading: loading,
    setCarouseloading: setLoading,
    payload,
  } = useContext(Context);

  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;

  const { fetchPayload } = useContext(Context);

  useEffect(() => {
    if (payload === null) fetchPayload();
  }, [fetchPayload, payload]);

  useEffect(() => {
    let index = 0;
    const fetchData = async () => {
      try {
        console.log("is payload available?", payload !== null);

        let contextJson;
        if (payload) {
          contextJson = payload.slice(0, 100);
        } else {
          contextJson = {
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
        }

        const prompt =
          "ini adalah kursdollar bank mandiri: " +
          JSON.stringify(contextJson) +
          " tolong berikan tips-tips insight dari kursdollar bank mandiri";

        const response = await getResponse(prompt);
        const data = JSON.parse(response);
        const cleanedTips = data.tips.map((tip: string) =>
          tip.replace(/\*\*/g, "")
        );
        setTips(cleanedTips);
        setLoading(false);
        setRetryCount(0); // Reset retry count on success
      } catch (error) {
        console.error("Failed to fetch data:", error);
        console.log("retrying...", index);

        index++;

        if (loading && retryCount < maxRetries) {
          setRetryCount((prevRetryCount) => prevRetryCount + 1);
        } else {
          setLoading(false);
        }
      }
    };

    console.log("tips: ", tips.length);

    if (tips.length === 0 && retryCount < maxRetries) {
      fetchData();
    }
  }, [payload, loading, tips, retryCount]);

  return (
    <div className="home">
      <div className="box box8">
        <Carousel />
      </div>
      <div className="home_chart">
        <div className="box box7">
          <BarChart barChart={bankNotes} />
        </div>
        <div className="box box7">
          <BarChart barChart={eRates} />
        </div>
        <div className="box box7">
          <BarChart barChart={ddTT} />
        </div>
        <div className="box box7">
          <BarChart barChart={specialRates} />
        </div>
      </div>
      <div className="App">
        {/*<h1>Custom Dropdown Select Menu</h1>
        <CustomDropdown />*/}
        <Table />
      </div>
    </div>
  );
};

export default Home;
