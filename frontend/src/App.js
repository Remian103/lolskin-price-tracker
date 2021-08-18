import React from 'react';
import './css/App.css';
import { Div, Text } from "atomize";

import Nav from './components/NavAnchor';
import RecommendCarousel from './components/RecommendCarousel';
import ChampBox from './components/ChampBox';

function App() {

    const anchorList = [
        { id: 0, name: "추천 스킨", link: "#recommend-skins", type: "hash" },
        { id: 1, name: "챔피언 목록", link: "#champions", type: "hash" },
        { id: 2, name: "새 페이지", link: "/skins" }
    ];

    return (
        <>
            <Div className="main-background" />
            <header className="main-header">
                <Nav anchorList={anchorList} />
            </header>
            {/* body */}
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

            <Div className="content-container" bg="black400" /* main content */ >
                <Div className="content-background" bg="black600" /* background */ />

                <div className="hash-link" id="recommend-skins" />
                <Div
                    w="100%"
                    maxW="1024px"
                    p={{
                        t: "32px",
                        l: "1rem",
                        b: "1rem"
                    }}
                >
                    <Text
                        textSize={{ xs: "1rem", md: "1.5rem" }}
                    >
                        Recommend Skins
                    </Text>
                </Div>
                <RecommendCarousel />

                <div className="hash-link" id="champions" />
                <Div
                    w="100%"
                    maxW="1024px"
                    p={{ t: "32px", l: "1rem", b: "1rem" }}
                >
                    <Text
                        textSize={{ xs: "1rem", md: "1.5rem" }}
                    >
                        Champion List
                    </Text>
                </Div>
                <ChampBox />
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
            </Div>
        </>
    );
}

export default App;
