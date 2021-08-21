import React, { useEffect, useRef } from "react";
import { Div, Image, Text } from "atomize";
import { useRouteMatch } from "react-router-dom";
import { Chart, registerables } from 'chart.js';

import useDataFetch from "../hooks/useDataFetch";
import Carousel from "../components/Carousel";


/**
 * 
 * page for skin information
 * url : /skins/:skinId
 * 
 */

function Skins() {
    const { params } = useRouteMatch("/skins/:skinId");
    // update when skin id changed
    useEffect(() => {
        doSkinFetch(`/api/skins/${params.skinId}`);
    }, [params]);

    // skin data fetch
    const [{ isLoading, isError, data: skin }, doSkinFetch] = useDataFetch(
        `/api/skins/${params.skinId}`,
        {}
    );


    //chart data
    const chartRef = useRef(null);
    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");
        Chart.register(...registerables);
        
        const history = skin.price_history || [];
        console.log(history);

        history.sort();
        const labels = history.map(item => item.date);
        const datas = history.map(item => item.price);
        // dummy
        //const labels = ["a", "b", "c", "d", "a", "b", "c", "d", "a", "b", "c", "d", "a", "b", "c", "d", "a", "b", "c", "d"];
        //const datas = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55];

        const data = {
          labels: labels,
          datasets: [{
            label: 'My First Dataset',
            data: datas,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0
          }]
        };
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        stackWeight: 1
                    }
                }
            }
        });
        console.log(chart);

        return () => {
            console.log("chart destroy...");
            chart.destroy();
        };
    }, [skin]);


    // skin list of champion
    const [{data: championSkinList}, doChampionFetch] = useDataFetch(
        "initialUrl",
        []
    );
    const flickityOptions = {
        initialIndex: 0,
        cellAlign: "left",
        contain: "true",
        //wrapAround: true,
        //autoPlay: 3000,
    };
    useEffect(() => {
        if (skin.champion_id !== undefined) {
            doChampionFetch(`/api/champions/${skin.champion_id}/skins`);
        }
    }, [skin]);


    return (<>
        <Div
            pos="fixed"
            w="100%"
            h="100%"
            minW="700px"
        >
            <Image
                src={skin.full_image_url}
                w="100%"
            />
        </Div>
        <Div p="200px"></Div>
        <Div className="content-container" bg="transparent" /* main content */ >
            <Div className="content-background" bg="black600" />
            <div className="content-title">
                <Text
                    textSize={{ xs: "1rem", md: "1.5rem" }}
                >
                    {skin.name}
                </Text>
            </div>
            <div className="chart-container">
                <canvas ref={chartRef}></canvas>
            </div>
            <div className="content-title">
                <Text
                    textSize={{ xs: "1rem", md: "1.5rem" }}
                >
                    챔피언의 다른 스킨들
                </Text>
            </div>
            <Div
                p={{y:"1rem"}}
            >
                <Carousel list={championSkinList} flktyOption={flickityOptions} cellOption={{ type: "champion-skins" }} />
            </Div>
        </Div>
    </>);
}

export default Skins;