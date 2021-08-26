import React, { useEffect, useRef } from "react";
import { Div } from "atomize";
import { Chart, registerables } from 'chart.js';

function HistoryChart({ className, option, labels, data }) {
    //chart data
    const chartRef = useRef(null);
    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");
        Chart.register(...registerables);


        const chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: 'My First Dataset',
                    data: data,
                    fill: false,
                    borderColor: "green",
                    backgroundColor: "rgb(0,0,0,1)",
                    tension: 0
                }]
            },
            options: option
        });
        console.log("chart generated");

        return () => {
            console.log("chart destroy...");
            chart.destroy();
        };
    }, [option, labels, data]);

    return (
        <div className={(className || "") + " chart-container shadowDiv"}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default HistoryChart;