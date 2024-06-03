import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { BarChartSeries, ChartState, Series } from '../../types/types'
import exchange from "../../data/exchange-rates.json";

const convertTimestampToDate = (timestamp: number): string => {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day}-${month}`;
};

const BarChart: React.FC<{ barChart: BarChartSeries }> = ({ barChart }) => {
    const banks: Array<string> = [];
    banks.push(...barChart.banks);

    const [isBuying, setIsBuying] = useState(true);
    const [selectedBank, setSelectedBank] = useState<string>(banks[0]); // Set default bank to the first bank
    const [state, setState] = useState<ChartState | null>(null);

    useEffect(() => {
        if (selectedBank) {

            
            const filteredExchange = exchange.filter(item => item.type === barChart.title.toLowerCase() && item.bank === selectedBank.toLowerCase());
            const data = filteredExchange.reduce((current, latest) => {
                return current.date > latest.date ? current : latest;
            }, filteredExchange[0]);
            
            
            const dates:string = convertTimestampToDate(data.date);
            const buyValueUSD:number = Number(data.IDRExchangeRate.USD.buy);
            const buyValueCNY:number = Number(data.IDRExchangeRate.CNY.buy);
            const buyValueSGD:number = Number(data.IDRExchangeRate.SGD.buy);
            const buyValueEUR:number = Number(data.IDRExchangeRate.EUR.buy);
            const buyValueGBP:number = Number(data.IDRExchangeRate.GBP.buy);
            const buyValueJPY:number = Number(data.IDRExchangeRate.JPY.buy);
            const buyValueSAR:number = Number(data.IDRExchangeRate.SAR.buy);
            const sellValueCNY:number = Number(data.IDRExchangeRate.CNY.sell);
            const sellValueSGD:number = Number(data.IDRExchangeRate.SGD.sell);
            const sellValueEUR:number = Number(data.IDRExchangeRate.EUR.sell);
            const sellValueGBP:number = Number(data.IDRExchangeRate.GBP.sell);
            const sellValueJPY:number = Number(data.IDRExchangeRate.JPY.sell);
            const sellValueSAR:number = Number(data.IDRExchangeRate.SAR.sell);
            const sellValueUSD:number = Number(data.IDRExchangeRate.USD.sell);
            
            const buyValues:Array<number> = [buyValueUSD,buyValueCNY,buyValueSGD,buyValueEUR,buyValueGBP,buyValueJPY,buyValueSAR]
            const sellValues:Array<number> = [sellValueUSD,sellValueCNY,sellValueSGD,sellValueEUR,sellValueGBP,sellValueJPY,sellValueSAR]

            const barSeries: Series[] = [{
                name: selectedBank,
                data: isBuying ? buyValues : sellValues
            }]

            const labelStyle = {
                style: {
                    colors: "#fff",
                    fontSize: "14px",
                },
            };

            setState({
                series: barSeries,
                options: {
                    chart: {
                        type: 'bar',
                        height: 350,
                        toolbar: {
                            tools: {
                                download: false,
                            },
                        },
                    },
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
                            columnWidth: '55%',
                            endingShape: 'rounded',
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent'],
                    },
                    xaxis: {
                        categories: ["USD","CNY","SGD","EUR","GBP","JPY","SAR"],
                        labels: labelStyle
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
                            toggleDataSeries: true
                        }
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
        }
    }, [selectedBank, barChart.title, isBuying]);

    if (!state) {
        return <div>Loading...</div>;
    }

    const toggleData = () => {
        setIsBuying(!isBuying);
    };

    return (
        <>
            <button onClick={toggleData}>
                {isBuying ? "Selling" : "Buying"} Rates
            </button>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
            <div>
                {banks.map((bank, index) => (
                    <button key={index} onClick={() => setSelectedBank(bank)}>
                        {bank}
                    </button>
                ))}
            </div>
        </>
    )
};

export default BarChart;
