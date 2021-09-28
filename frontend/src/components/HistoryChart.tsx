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
                    borderColor: "green",
                    backgroundColor: "rgb(0,0,0,1)",
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
                            color: "black"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
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