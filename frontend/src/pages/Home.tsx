import React, { useEffect } from "react";
import { Div, Text } from "atomize";

import RecommendCarousel from "../components/RecommendCarousel";
import ChampBox from "../components/ChampBox";
import { AnchorObj } from "../interfaces/Nav.interface";


function Home({ setNav }: { setNav: React.Dispatch<React.SetStateAction<AnchorObj[]>> }) {
    // header navigation tab
    useEffect(() => {
        setNav([
            { id: 0, name: "홈", link: "/", type: "link" },
            { id: 1, name: "마이 페이지", link: "/myPage", type: "link" },
            { id: 2, name: "추천 스킨", link: "#recommend-skins", type: "hash" },
            { id: 3, name: "챔피언 목록", link: "#champions", type: "hash" },
            { id: 4, name: "새 페이지 테스트", link: "/skins", type: "new-tab" }
        ]);
    }, [setNav]);

    return (<>
        <Div /* title */
            d="flex"
            h={{ xs: "150px", md: "400px" }}
            align="center"
            justify="center"
            flexDir="column"
        >
            <Text
                p={{ l: "0.5rem", r: "0.5rem" }}
                textSize="display3"
                textAlign="center"
            >
                LOL PRICE TRACKER
            </Text>
        </Div>

        <div className="content-container home"/* main content */ >
            <div className="content-background" /* background */ />

            <div className="hash-link" id="recommend-skins" />
            <div className="content-title">
                <Text
                    textSize={{ xs: "1rem", md: "1.5rem" }}
                >
                    Recommend Skins
                </Text>
            </div>
            <RecommendCarousel />

            <div className="hash-link" id="champions" />
            <div className="content-title">
                <Text
                    textSize={{ xs: "1rem", md: "1.5rem" }}
                >
                    Champion List
                </Text>
            </div>
            <ChampBox />
            {/*}
            <Div
                h="1000px"
                bg="brown"
                textSize="display3"
                textAlign="center"
            >
                Dummy
            </Div>
            {/*
            <div className="App-header">
                <img src="/images/logo.svg" className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </div>
            */}
        </div>
    </>);
}

export default Home;