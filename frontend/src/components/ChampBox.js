import React, { useState, useEffect } from "react";
import { Div } from "atomize";

import Carousel from "../components/Carousel";
import Modal from "../components/Modal";
import useDataFetch from "../hooks/useDataFetch";
import "../css/ChampBox.css";

function ChampBox() {
    const [champId, setId] = useState(0);
    const [{ isLoading: champLoading, isError: champError, data: champList }] = useDataFetch("/api/champions", []);

    const [display, setDisplay] = useState(false);
    const [{ isLoading: skinLoading, isError: skinError, data: skinList }, doFetch] = useDataFetch("initialUrl", []);
    useEffect(() => {
        if (display)
            doFetch(`/api/champions/${champId}/skins`);
    }, [display, champId, doFetch]);
    const flickityOptions = {
        initialIndex: 0,
        cellAlign: "left",
        contain: true,
        pageDots: false,
        //wrapAround: true,
        //autoPlay: 3000,
    };

    const items = champList.map((item) =>
        <Div
            key={item.id}
            p="0.5rem"
        >
            <img className="champion-icon"
                src={item.icon_url}
                alt={item.name}
                title={item.name}
                onClick={() => {
                    setId(item.id);
                    setDisplay(true);
                }}
            />
        </Div>
    );

    return (<>
        <Div
            d="flex"
            justify="space-evenly"
            flexWrap="wrap"
            p="0.5rem"
        >
            {
                champLoading ? <p> is loading... </p> :
                champError || !Array.isArray(items) ? <p> something error </p> :
                items
            }
        </Div>

        <Modal className="skins" isOpen={display} close={() => setDisplay(false)}>
            {
                skinLoading ? <p> is loading... </p> :
                skinError || !Array.isArray(skinList) ? <p> something error </p> :
                <Carousel list={skinList} flktyOption={flickityOptions} cellOption={{ type: "champion-skins" }} />
            }
        </Modal>
    </>);
}

export default ChampBox;