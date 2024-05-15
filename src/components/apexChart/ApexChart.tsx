import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import data from "../../data/data.json";

interface ExchangeRate {
    buying: number;
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
    };
}

export default function Chart() {
    const date: string[] = [];
    const buyValueUSD: number[] = [];
    const buyValueCNY: number[] = [];
    const buyValueSGD: number[] = [];
    const buyValueEUR: number[] = [];
    const buyValueGBP: number[] = [];
    const buyValueJPY: number[] = [];

    data.forEach((x: Data) => {
        date.push(x.date);
        buyValueUSD.push(x.IDRExchangeRate.USD.buying);
        buyValueCNY.push(x.IDRExchangeRate.CNY.buying);
        buyValueSGD.push(x.IDRExchangeRate.SGD.buying);
        buyValueEUR.push(x.IDRExchangeRate.EUR.buying);
        buyValueGBP.push(x.IDRExchangeRate.GBP.buying);
        buyValueJPY.push(x.IDRExchangeRate.JPY.buying);
    });

    const labelStyle = {
        style: {
            colors: '#fff',
            fontSize: '14px'
        }
    };

    const [state] = useState({
        series: [
            { name: "USD", data: buyValueUSD },
            { name: "CNY", data: buyValueCNY },
            { name: "SGD", data: buyValueSGD },
            { name: "EUR", data: buyValueEUR },
            { name: "GBP", data: buyValueGBP },
            { name: "JPY", data: buyValueJPY }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line' as const,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false,
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
                row: {
                    colors: ['#fff', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: date,
                labels: labelStyle
            },
            yaxis: {
                labels: {
                    style: labelStyle.style,
                    formatter: (val: number) => `Rp.${val}`
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
                theme: 'dark' as const,
                y: {
                    formatter: (value: number) => `Rp.${value.toFixed(2)}`,
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

    return (
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
    );
}
