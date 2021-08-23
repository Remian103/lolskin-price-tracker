import React, { useEffect, useRef } from "react";
import { Div, Image, Text } from "atomize";
import { Chart, registerables } from 'chart.js';

function HistoryChart({ option, labels, data }) {
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

        return () => {
            console.log("chart destroy...");
            chart.destroy();
        };
    }, [option, labels, data]);

    return (
        <Div p={{x: "2rem"}}>
            <div className="chart-container shadowDiv">
                <canvas ref={chartRef}></canvas>
            </div>
        </Div>
    );
}

export default HistoryChart;