import { useState, useEffect, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import "./apexChart.scss";
import { InfoChartProps, ChartState } from "../../types/types";
import { Context } from "../../context/Context";

const convertTimestampToDate = (timestamp: number): string => {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day}-${month}`;
};

export default function Chart({ currentUser }: InfoChartProps) {
    const [isBuying, setIsBuying] = useState(true);
    const [selectedKursType, setSelectedType] = useState(currentUser.info.jenis_kurs.split(",")[0]);
    const [state, setState] = useState<ChartState>({ series: [], options: {} });
    const {payload} = useContext(Context);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    useEffect(() => {
        if(!payload)return;
        let i:number = 0;

        const dates: string[] = [];
        const buyValueUSD: number[] = [];
        const buyValueCNY: number[] = [];
        const buyValueSGD: number[] = [];
        const buyValueEUR: number[] = [];
        const buyValueGBP: number[] = [];
        const buyValueJPY: number[] = [];
        const buyValueSAR: number[] = [];
        const sellValueUSD: number[] = [];
        const sellValueCNY: number[] = [];
        const sellValueSGD: number[] = [];
        const sellValueEUR: number[] = [];
        const sellValueGBP: number[] = [];
        const sellValueJPY: number[] = [];
        const sellValueSAR: number[] = [];

        if(i === 0){
            i++;
            payload.slice().reverse().forEach((res) => {
                if (res.bank.toLowerCase() === currentUser.title.toLowerCase() && res.type === selectedKursType.toLowerCase().trim()) {
                    dates.push(convertTimestampToDate(res.date));
                    buyValueUSD.push(Number(res.IDRExchangeRate.USD.buy));
                    buyValueCNY.push(Number(res.IDRExchangeRate.CNY.buy));
                    buyValueSGD.push(Number(res.IDRExchangeRate.SGD.buy));
                    buyValueEUR.push(Number(res.IDRExchangeRate.EUR.buy));
                    buyValueGBP.push(Number(res.IDRExchangeRate.GBP.buy));
                    buyValueJPY.push(Number(res.IDRExchangeRate.JPY.buy));
                    buyValueSAR.push(Number(res.IDRExchangeRate.SAR.buy));
                    sellValueCNY.push(Number(res.IDRExchangeRate.CNY.sell));
                    sellValueSGD.push(Number(res.IDRExchangeRate.SGD.sell));
                    sellValueEUR.push(Number(res.IDRExchangeRate.EUR.sell));
                    sellValueGBP.push(Number(res.IDRExchangeRate.GBP.sell));
                    sellValueJPY.push(Number(res.IDRExchangeRate.JPY.sell));
                    sellValueSAR.push(Number(res.IDRExchangeRate.SAR.sell));
                    sellValueUSD.push(Number(res.IDRExchangeRate.USD.sell));
                }
            });
        }

        const labelStyle = {
            style: {
                colors: "#fff",
                fontSize: "14px",
            },
        };

        setState({
            series: [
                { name: "USD", data: isBuying ? buyValueUSD : sellValueUSD },
                { name: "CNY", data: isBuying ? buyValueCNY : sellValueCNY },
                { name: "SGD", data: isBuying ? buyValueSGD : sellValueSGD },
                { name: "EUR", data: isBuying ? buyValueEUR : sellValueEUR },
                { name: "GBP", data: isBuying ? buyValueGBP : sellValueGBP },
                { name: "JPY", data: isBuying ? buyValueJPY : sellValueJPY },
                { name: "SAR", data: isBuying ? buyValueSAR : sellValueSAR },
            ],
            options: {
                chart: {
                    height: 350,
                    type: "line" as const,
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        tools: {
                            download: false,
                        },
                    },
                    animations: {
                        enabled: true,
                        easing: "easeinout" as const,
                        speed: 800,
                        animateGradually: {
                            enabled: true,
                            delay: 150,
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 350,
                        },
                    },
                },
                title: {
                    text: currentUser.title,
                    align: "center" as const,
                    style: {
                        color: "#fff",
                        fontSize: "18px",
                    },
                },
                grid: {
                    borderColor: "#999" as const,
                    yaxis: {
                        lines: {
                            show: true,
                        },
                    },
                },
                xaxis: {
                    categories: dates,
                    labels: {
                        style: labelStyle.style,
                        rotate: 0
                    },
                    tickAmount: 5,
                },
                yaxis: {
                    labels: {
                        style: labelStyle.style,
                        formatter: (val: number) => `Rp ${val.toLocaleString("id-ID")}`,
                    },
                },
                legend: {
                    position: "top" as const,
                    labels: {
                        colors: "#fff",
                    },
                    fontSize: "14px",
                    onItemHover: {
                        toggleDataSeries: true
                    }
                },
                tooltip: {
                    shared: false,
                    followCursor: false,
                    theme: "dark" as const,
                    y: {
                        formatter: (val: number) => `Rp ${val.toLocaleString("id-ID")}`,
                        title: {
                            formatter: (seriesName: string) => seriesName,
                        },
                    },
                    style: {
                        fontSize: "12px",
                        color: "#000", // this will set the text color to black.
                    },
                    background: {
                        color: "#fff", // this will set the background color to white.
                    },
                },
            },
        });
    }, [currentUser, isBuying, , payload]);

    const toggleData = () => {
        setIsBuying(!isBuying);
    };

    return (
        <div>
            <span>
                <button onClick={toggleData}>
                    {isBuying ? "Selling" : "Buying"} Rates
                </button>
                <select name="kurs-type" id="kurs-type" onChange={handleSelectChange} value={selectedKursType}>
                    {currentUser.info.jenis_kurs.split(",").map((type, index) => (
                        <option value={type} key={index}>{type}</option>
                    ))}
                </select>
            </span>
            <ReactApexChart options={state.options} series={state.series} type="line" height={400} />
        </div>
    );
}
