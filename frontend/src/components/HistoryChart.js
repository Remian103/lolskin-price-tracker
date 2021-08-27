import React, { useEffect, useRef } from "react";
import { Chart, registerables } from 'chart.js';

function HistoryChart({ className, chartOption, chartLabel, chartData }) {
    const chartRef = useRef(null);
    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");
        Chart.register(...registerables);
        let data = chartData.slice();

        const chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartLabel,
                datasets: [{
                    data: data,
                    fill: false,
                    borderColor: "green",
                    backgroundColor: "rgb(0,0,0,1)",
                    tension: 0
                }]
            },
            options: chartOption
        });
        console.log("chart generated");

        return () => {
            chart.destroy();
            console.log("chart destroy...");
        };
    }, [chartOption, chartLabel, chartData]);

    return (
        <div className={(className || "") + " chart-container"}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default HistoryChart;