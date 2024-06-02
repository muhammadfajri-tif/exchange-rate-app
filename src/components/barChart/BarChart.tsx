import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {ChartState} from '../../types/types'

const BarChart: React.FC = () => {
    const [state, setState] = useState<ChartState | null>(null);

    useEffect(() => {
        const labelStyle = {
            style: {
                colors: "#fff",
                fontSize: "14px",
            },
        };
        setState({
            series: [
                {
                    name: 'Net Profit',
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
                },
                {
                    name: 'Revenue',
                    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                },
                {
                    name: 'Free Cash Flow',
                    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
                },
            ],
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
                    text: "Bank Notes",
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
                    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    labels: labelStyle
                },
                yaxis: {
                    labels: labelStyle,
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
                        formatter: function (val: number) {
                            return "$ " + val + " thousands";
                        },
                    },
                },
            },
        });
    }, []);

    if (!state) {
        return <div>Loading...</div>;
    }

    return <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />;
};

export default BarChart;
