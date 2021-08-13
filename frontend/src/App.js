import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './NavAnchor';
import {
    Div,
    Button,
    Text,
    Icon
} from "atomize";

function App() {

    //console test log
    useEffect(() => {
        console.log("test log");
    }, [])

    const anchorList = [
        { name: "추천 스킨", link: "#recommend-skins" },
        { name: "챔피언 목록", link: "#champions" }
    ];

    return (
        <>
            <Div className="main-background" />
            <header className="main-header">
                <Nav anchorList={anchorList} />
            </header>
            <body>
                <Div className="container">
                    <Div className="item">1</Div>
                    <Div className="item">2</Div>
                    <Div className="item">3</Div>
                    <Div className="item">4</Div>
                    <Div className="item">5</Div>
                </Div>
                <div id="recommend-skins" className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
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
            </body>
        </>
    );
}

export default App;
