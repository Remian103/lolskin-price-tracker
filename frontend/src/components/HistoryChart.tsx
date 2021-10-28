import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

import { PriceHistory } from '../interfaces/Fetch.interface';

interface Props {
    priceHistory: PriceHistory[];
}

function HistoryChart({ priceHistory }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const graphColorTheme = { info600: 'rgb(2, 132, 254)' };

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        Chart.register(...registerables);

        const history = priceHistory;
        history.sort((a: PriceHistory, b: PriceHistory) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        });
        const chartLabel = history.map((item: PriceHistory) => item.date);
        const chartData = history.map((item: PriceHistory) => item.sale_price);

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    type: 'line',
                    data: chartData,
                    tension: 0,
                }, {
                    type: 'bar',
                    data: chartData,
                    barPercentage: 1,
                    categoryPercentage: 1,
                }],
                labels: chartLabel,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        stackWeight: 1,
                        ticks: { color: 'black' },
                    },
                    x: {
                        ticks: {
                            font: { size: 10 },
                            color: 'black',
                        },
                    },
                },
                elements: {
                    line: { borderColor: graphColorTheme.info600 },
                    point: {
                        radius: 7,
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                    },
                    bar: {
                        backgroundColor: 'transparent',
                        hoverBackgroundColor: graphColorTheme.info600,
                    },
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        displayColors: false,
                        titleFont: { size: 15 },
                        bodyFont: { size: 20 },
                        callbacks: {
                            label(context) {
                                return [`원가: ${history[context.dataIndex].price}RP`, `가격: ${context.raw}RP`];
                            },
                        },
                    },
                },
            },
        });
        if (process.env.NODE_ENV !== 'production') console.log('chart generated');

        return () => {
            chart.destroy();
            if (process.env.NODE_ENV !== 'production') console.log('chart destroy');
        };
    }, [priceHistory]);

    return (
        <div className="shadowDiv chart-container">
            <canvas ref={canvasRef} />
        </div>
    );
}

export default HistoryChart;
