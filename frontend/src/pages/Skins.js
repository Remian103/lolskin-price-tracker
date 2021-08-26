import React, { useEffect, useState, useMemo } from "react";
import { Div, Text } from "atomize";
import { useRouteMatch } from "react-router-dom";

import useDataFetch from "../hooks/useDataFetch";
import Carousel from "../components/Carousel";
import HistoryChart from "../components/HistoryChart";
import CommentList from "../components/CommentList";


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
            { id: 2, name: "다른 스킨들", link: "#champions", type: "hash" },
            { id: 3, name: "댓글", link: "#comments", type: "hash" }
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
    const [chartLabel, setLabel] = useState([]);
    const [chartData, setData] = useState([]);
    const chartOption = useMemo(() => {
        return {
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
        };
    }, []);
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
            contain: true,
            pageDots: false,
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
                    <Div p={{
                        x: "1rem",
                        b: "2rem"
                    }}>
                        <HistoryChart className="shadowDiv" chartOption={chartOption} chartLabel={chartLabel} chartData={chartData} />
                    </Div>
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
            <Carousel list={championSkinList} flktyOption={flickityOptions} cellOption={{ type: "champion-skins" }} />

            <div className="hash-link" id="comments" />
            <div className="content-title">
                <Text
                    textSize={{ xs: "1rem", md: "1.5rem" }}
                >
                    Comments
                </Text>
            </div>
            <Div p={{ x: "1rem" }}>
                <CommentList skinId={params.skinId} />
            </Div>
        </div>
    </>);
}

export default Skins;