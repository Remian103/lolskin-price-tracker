import * as React from "react";
import { useEffect, useRef } from "react";
import { Chart, registerables } from 'chart.js';

interface Props {
    className: string;
    chartOption: any;
    chartLabel: string[];
    chartData: number[];
}

function HistoryChart({ className, chartOption, chartLabel, chartData }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
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
        if(process.env.NODE_ENV !== "production") console.log("chart generated");

        return () => {
            chart.destroy();
            if(process.env.NODE_ENV !== "production") console.log("chart destroy");
        };
    }, [chartOption, chartLabel, chartData]);

    return (
        <div className={(className || "") + " chart-container"}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default HistoryChart;