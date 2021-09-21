import React, { useState, useEffect } from "react";
import { Div, Input, Icon } from "atomize";

import Carousel from "../components/Carousel";
import Modal from "../components/Modal";
import useDataFetch from "../hooks/useDataFetch";
import { hangulFuzzyMatch } from "../utils/utils";
import "../css/ChampBox.css";

function ChampBox() {
    // 챔피언 리스트 fetch
    const [champId, setId] = useState(0);
    const [{ isLoading: champLoading, isError: champError, data: champList }] = useDataFetch("/api/champions", []);


    // modal window
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


    // search by champion name
    const [word, setWord] = useState("");
    const [result, setResult] = useState([]);
    useEffect(() => {
        if (word.length === 0) {
            setResult(champList);
            return;
        }
        // regular expression
        const regex = hangulFuzzyMatch(word);
        if(process.env.NODE_ENV !== 'production') console.log(word,regex);
        setResult(champList.filter((champion) => regex.test(champion.name)));
    }, [champList, word]);
    const handleInputChange = (event) => {
        setWord(event.target.value);
    };
    const items = result.map((champion) =>
        <Div
            key={champion.id}
            p="0.5rem"
        >
            <img className="champion-icon"
                src={champion.icon_url}
                alt={champion.name}
                title={champion.name}
                onClick={() => {
                    setId(champion.id);
                    setDisplay(true);
                }}
            />
        </Div>
    );

    return (<>
        <Div p={{ x: "1rem" }}>
            <Input
                placeholder="챔피언 이름"
                onChange={handleInputChange}
                suffix={
                    <Icon
                        name="Search"
                        size="20px"
                        pos="absolute"
                        right="1rem"
                        transform="translateY(-50%)"
                        top="50%"
                    />
                }
            />
        </Div>
        <Div
            d="flex"
            justify="space-evenly"
            flexWrap="wrap"
            p="0.5rem"
        >
            {
                champLoading ? <p> is loading... </p> :
                    champError || !Array.isArray(items) ? <p> something error </p> :
                        word.length !== 0 && result.length === 0 ?
                            <Div
                                d="flex"
                                justify="center"
                                align="center"
                                h="20rem"
                                textSize="2rem"
                            >
                                no result
                            </Div> :
                            result.map((champion) =>
                                <Div
                                    key={champion.id}
                                    p="0.5rem"
                                >
                                    <img className="champion-icon"
                                        src={champion.icon_url}
                                        alt={champion.name}
                                        title={champion.name}
                                        onClick={() => {
                                            setId(champion.id);
                                            setDisplay(true);
                                        }}
                                    />
                                </Div>
                            )
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