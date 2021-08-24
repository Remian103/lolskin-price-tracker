import React, { useEffect, useState } from "react";
import { Div, Text } from "atomize";
import { useRouteMatch } from "react-router-dom";

import useDataFetch from "../hooks/useDataFetch";
import Carousel from "../components/Carousel";
import HistoryChart from "../components/HistoryChart";


/**
 * 
 * page for skin information
 * url : /skins/:skinId
 * 
 */

function Skins({ setNav }) {
    const { params } = useRouteMatch("/skins/:skinId");

    // header navigation tab
    useEffect(() => {
        setNav([
            { id: 0, name: "홈", link: "/home", type: "link" },
            { id: 1, name: "가격 그래프", link: "#chart", type: "hash" },
            { id: 2, name: "다른 스킨들", link: "#champions", type: "hash" }
        ]);
    }, [setNav]);

    // skin data fetch
    const [{ data: skin }, doSkinFetch] = useDataFetch(
        `/api/skins/${params.skinId}`,
        {}
    );


    // update when skin id changed
    useEffect(() => {
        doSkinFetch(`/api/skins/${params.skinId}`);
    }, [params, doSkinFetch]);


    //generate chart data
    const [chartLabels, setLabel] = useState([]);
    const [chartData, setData] = useState([]);
    const chartOption = {
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
            legend: false
        }
    }
    useEffect(() => {
        const history = skin.price_history || [];

        history.sort();
        setLabel(history.map(item => item.date));
        setData(history.map(item => item.price));
    }, [skin]);


    // skin list of champion
    const [{ data: championSkinList }, doChampionFetch] = useDataFetch("initialUrl", []);
    const flickityOptions = {
        initialIndex: 0,
        cellAlign: "left",
        //wrapAround: true,
        //autoPlay: 3000,
    };
    useEffect(() => {
        if (skin.champion_id !== undefined) {
            doChampionFetch(`/api/champions/${skin.champion_id}/skins`);
        }
    }, [skin, doChampionFetch]);


    return (<>
        <Div className="background-skin" bgImg={skin.full_image_url} />

        <Div p="200px"></Div>

        <div className="content-container skins" /* main content */ >
            <div className="content-background" />
           
            <div className="content-title">
                <Text
                    textSize={{ xs: "1rem", md: "1.5rem" }}
                >
                    {skin.name === "default" ? "기본 스킨" : skin.name}
                </Text>
            </div>

            {skin.name === "default" ? null :
                <>
                    <div className="hash-link" id="chart" />
                    <HistoryChart option={chartOption} labels={chartLabels} data={chartData} />
                </>
            }
            
            <div className="hash-link" id="champions" />
            <div className="content-title">
                <Text
                    textSize={{ xs: "1rem", md: "1.5rem" }}
                >
                    챔피언의 다른 스킨들
                </Text>
            </div>
            <Div
                p={{ y: "1rem" }}
            >
                <Carousel list={championSkinList} flktyOption={flickityOptions} cellOption={{ type: "champion-skins" }} />
            </Div>
        </div>
    </>);
}

export default Skins;