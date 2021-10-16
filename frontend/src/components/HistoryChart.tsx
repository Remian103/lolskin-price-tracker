import * as React from "react";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

import { PriceHistory } from "../interfaces/Fetch.interface";

interface Props {
    className: string;
    priceHistory: PriceHistory[];
}

function HistoryChart({ className, priceHistory }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const graphColorTheme = {
        info600: "rgb(2, 132, 254)"
    }

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        Chart.register(...registerables);

        const history = priceHistory;
        history.sort((a: PriceHistory, b: PriceHistory) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
        const chartLabel = history.map((item: PriceHistory) => item.date);
        const chartData = history.map((item: PriceHistory) => item.sale_price);

        const chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartLabel,
                datasets: [{
                    data: chartData,
                    fill: false,
                    tension: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        stackWeight: 1,
                        ticks: {
                            color: "black"
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 10
                            },
                            color: "black"
                        }
                    }
                },
                elements: {
                    line: {
                        borderColor: graphColorTheme.info600
                    },
                    point: {
                        radius: 5,
                        backgroundColor: graphColorTheme.info600,
                        hoverRadius: 7,
                        hoverBackgroundColor: "red",
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        displayColors: false,
                        titleFont: {size: 20},
                        bodyFont: {size: 20},
                        callbacks: {
                            label: function(context) {
                                return "가격 : " + context.formattedValue + "RP"
                            }
                        }
                    }
                }
            }
        });
        if (process.env.NODE_ENV !== "production") console.log("chart generated");

        return () => {
            chart.destroy();
            if (process.env.NODE_ENV !== "production") console.log("chart destroy");
        };
    }, [priceHistory]);

    return (
        <div className={(className || "") + " chart-container"}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default HistoryChart;