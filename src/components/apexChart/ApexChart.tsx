import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import data from "../../data/data.json";
import "./apexChart.scss";

interface ExchangeRate {
    buying: number;
    selling: number;
}

interface Data {
    date: string;
    IDRExchangeRate: {
        USD: ExchangeRate;
        CNY: ExchangeRate;
        SGD: ExchangeRate;
        EUR: ExchangeRate;
        GBP: ExchangeRate;
        JPY: ExchangeRate;
        SAR: ExchangeRate;
    };
}

export default function Chart() {
    const [isBuying, setIsBuying] = useState(true);

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

    data.forEach((x: Data) => {
        dates.push(x.date);
        buyValueUSD.push(x.IDRExchangeRate.USD.buying);
        buyValueCNY.push(x.IDRExchangeRate.CNY.buying);
        buyValueSGD.push(x.IDRExchangeRate.SGD.buying);
        buyValueEUR.push(x.IDRExchangeRate.EUR.buying);
        buyValueGBP.push(x.IDRExchangeRate.GBP.buying);
        buyValueJPY.push(x.IDRExchangeRate.JPY.buying);
        buyValueSAR.push(x.IDRExchangeRate.SAR.buying);
        sellValueUSD.push(x.IDRExchangeRate.USD.selling);
        sellValueCNY.push(x.IDRExchangeRate.CNY.selling);
        sellValueSGD.push(x.IDRExchangeRate.SGD.selling);
        sellValueEUR.push(x.IDRExchangeRate.EUR.selling);
        sellValueGBP.push(x.IDRExchangeRate.GBP.selling);
        sellValueJPY.push(x.IDRExchangeRate.JPY.selling);
        sellValueSAR.push(x.IDRExchangeRate.SAR.selling);
    });

    const labelStyle = {
        style: {
            colors: '#fff',
            fontSize: '14px'
        }
    };

    const [state, setState] = useState({
        series: [
            { name: "USD", data: isBuying ? buyValueUSD : sellValueUSD },
            { name: "CNY", data: isBuying ? buyValueCNY : sellValueCNY },
            { name: "SGD", data: isBuying ? buyValueSGD : sellValueSGD },
            { name: "EUR", data: isBuying ? buyValueEUR : sellValueEUR },
            { name: "GBP", data: isBuying ? buyValueGBP : sellValueGBP },
            { name: "JPY", data: isBuying ? buyValueJPY : sellValueJPY },
            { name: "SAR", data: isBuying ? buyValueSAR : sellValueSAR }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line' as const,
                zoom: {
                    enabled: false
                }
            },
            stroke: {
                curve: 'straight' as const
            },
            title: {
                text: 'BCA',
                align: 'center' as const,
                style: {
                    color: '#fff',
                    fontSize: '18px'
                }
            },
            grid: {
                borderColor: 'black' as const,
                xaxis:{
                    lines:{
                        show: true
                    }
                }
            },
            xaxis: {
                categories: dates,
                labels: labelStyle
            },
            yaxis: {
                labels: {
                    style: labelStyle.style,
                    formatter: (val: number) => `Rp ${val.toLocaleString('id-ID')}`
                }
            },
            legend: {
                position: 'top' as const,
                labels: {
                    colors: '#fff'
                },
                fontSize: '14px'
            },
            tooltip: {
                shared: false,
                followCursor: false,
                theme: 'dark' as const,
                y: {
                    formatter: (val: number) => `Rp ${val.toLocaleString('id-ID')}`,
                    title: {
                        formatter: (seriesName: string) => seriesName,
                    }
                },
                style: {
                    fontSize: '12px',
                    color: '#000' // this will set the text color to black.
                },
                background: {
                    color: '#fff' // this will set the background color to white.
                }
            }
        }
    });

    const toggleData = () => {
        setIsBuying(!isBuying);
        setState(prevState => ({
            ...prevState,
            series: [
                { name: "USD", data: isBuying ? sellValueUSD : buyValueUSD },
                { name: "CNY", data: isBuying ? sellValueCNY : buyValueCNY },
                { name: "SGD", data: isBuying ? sellValueSGD : buyValueSGD },
                { name: "EUR", data: isBuying ? sellValueEUR : buyValueEUR },
                { name: "GBP", data: isBuying ? sellValueGBP : buyValueGBP },
                { name: "JPY", data: isBuying ? sellValueJPY : buyValueJPY }
            ]
        }));
    };

    return (
        <>
        <button onClick={toggleData}>
                {isBuying ? "Selling" : "Buying"} Rates
        </button>
        <ReactApexChart options={state.options} series={state.series} type="line" height={400} />
        </>
    );
}
