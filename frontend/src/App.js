import React from 'react';
import './css/App.css';
import { Div, Text } from "atomize";
import Nav from './components/NavAnchor';
import CarouselWrapper from './components/CarouselWrapper';
import ChampBox from './components/ChampBox';

function App() {

    const anchorList = [
        { id: 0, name: "추천 스킨", link: "#recommend-skins" },
        { id: 1, name: "챔피언 목록", link: "#champions" }
    ];

    // carousel test
    const skinList = [
        { id: 0, src: "/images/thumb-1920-328327.jpg", description: "thumb-1920-328327.jpg" },
        { id: 1, src: "/images/thumb-1920-533923.jpg", description: "thumb-1920-533923.jpg" },
        { id: 2, src: "/images/thumb-1920-536426.png", description: "thumb-1920-536426.png" },
        { id: 3, src: "/images/thumb-1920-627080.png", description: "thumb-1920-627080.png" },
        { id: 4, src: "/images/thumb-1920-328327.jpg", description: "thumb-1920-328327.jpg" },
        { id: 5, src: "/images/thumb-1920-533923.jpg", description: "thumb-1920-533923.jpg" },
        { id: 6, src: "/images/thumb-1920-536426.png", description: "thumb-1920-536426.png" },
        { id: 7, src: "/images/thumb-1920-627080.png", description: "thumb-1920-627080.png" }
    ];

    const champList = [
        { id: 0, src: "http://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/Aatrox.png", description: "Aatrox" },
        { id: 1, src: "http://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/Jax.png", description: "Jax" },
    ]

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

            <Div className="content-container" bg="black400" /* main content */>
                <Div className="content-background" bg="black600" /* background *//>
                <CarouselWrapper title="Recommend Skins" list={skinList} option={{ type: "recommend-skins" }} />
                <ChampBox list={champList} />
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
