import React from "react";
import { Div, Text } from "atomize";
import RecommendCarousel from '../components/RecommendCarousel';
import ChampBox from '../components/ChampBox';

function Home() {
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

        <Div className="content-container"/* main content */ >
            <Div className="content-background" bg="black600" /* background */ />

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
        </Div>
    </>);
}

export default Home;