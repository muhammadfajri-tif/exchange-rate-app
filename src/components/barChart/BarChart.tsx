import React, { useState, useEffect, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { BarChartSeries, ChartState } from "../../types/types";
import "./BarChart.scss";
import { Context } from "../../context/Context";

interface IPrice {
  buy: string;
  sell: string;
}

interface IDRExchangeRate {
  USD: IPrice;
  CNY: IPrice;
  SGD: IPrice;
  EUR: IPrice;
  GBP: IPrice;
  JPY: IPrice;
  SAR: IPrice;
  [key: string]: IPrice;
}

const BarChart: React.FC<{ barChart: BarChartSeries }> = ({ barChart }) => {
  const banks: Array<string> = [];
  banks.push(...barChart.banks);

  const [isBuying, setIsBuying] = useState(true);
  const [state, setState] = useState<ChartState | null>(null);
  const [selectedKurs, setKurs] = useState<string>("USD");
  const { payload } = useContext(Context);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setKurs(event.target.value);
  };

  useEffect(() => {
    if (!payload) return;
    const getDataForBank = (bank: string) => {
      const filteredExchange = payload.filter(
        (item) =>
          item.type === barChart.title.toLowerCase() &&
          item.bank === bank.toLowerCase()
      );
      const latestData = filteredExchange.reduce((current, latest) => {
        return current.date > latest.date ? current : latest;
      }, filteredExchange[0]);

      if (
        latestData &&
        latestData.IDRExchangeRate &&
        (latestData.IDRExchangeRate as IDRExchangeRate)[selectedKurs]
      ) {
        return {
          bank,
          buy: Number(
            (latestData.IDRExchangeRate as IDRExchangeRate)[selectedKurs].buy
          ),
          sell: Number(
            (latestData.IDRExchangeRate as IDRExchangeRate)[selectedKurs].sell
          ),
        };
      } else {
        return {
          bank,
          buy: 0,
          sell: 0,
        };
      }
    };

    const seriesData = banks.map((bank) => {
      const data = getDataForBank(bank);
      return isBuying ? data.buy : data.sell;
    });

    const colors = banks.map(
      (_, index) => `hsl(${(index * 360) / banks.length}, 70%, 50%)`
    );

    const labelStyle = {
      style: {
        colors: "#fff",
        fontSize: "14px",
      },
    };

    setState({
      series: [
        {
          name: isBuying ? "Buying" : "Selling",
          data: seriesData,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            tools: {
              download: false,
            },
          },
        },
        colors: colors,
        title: {
          text: barChart.title,
          align: "center" as const,
          style: {
            color: "#fff",
            fontSize: "18px",
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: banks,
          labels: labelStyle,
        },
        yaxis: {
          labels: {
            style: labelStyle.style,
            formatter: (val: number) => `Rp ${val.toLocaleString("id-ID")}`,
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          labels: {
            colors: "#fff",
          },
          fontSize: "14px",
          onItemHover: {
            toggleDataSeries: true,
          },
        },
        tooltip: {
          theme: "dark" as const,
          y: {
            formatter: (val: number) => `Rp ${val.toLocaleString("id-ID")}`,
            title: {
              formatter: (seriesName: string) => seriesName,
            },
          },
        },
      },
    });
  }, [barChart.title, isBuying, selectedKurs, payload]);

  if (!state) {
    return <div>Loading...</div>;
  }

  const toggleData = () => {
    setIsBuying(!isBuying);
  };

  return (
    <>
      <button onClick={toggleData}>
        {isBuying ? "Buying" : "Selling"} Rates
      </button>
      <select
        name="kurs"
        id="kurs"
        onChange={handleSelectChange}
        value={selectedKurs}
      >
        <option value="USD">USD</option>
        <option value="CNY">CNY</option>
        <option value="SGD">SGD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="SAR">SAR</option>
      </select>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </>
  );
};

export default BarChart;
