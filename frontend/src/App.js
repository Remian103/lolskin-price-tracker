import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Div,
  Button,
  Text,
  Icon,
  Anchor
} from "atomize";

function App() {

  //console test log
  useEffect(() => {
    console.log("test log");
  }, [])

  return (
    <div>
      <header>
        <nav style={{display: "flex"}}>
          <Anchor href="#recommend-skin">
            <Button
                bg="info700"
                hoverBg="info600"
                m={{ x: "1rem", y: "1rem" }}
                cursor="pointer"
                rounded="md"
            >
              추천 스킨
            </Button>
          </Anchor>
          <Anchor href="#champ">
            <Button
                bg="info700"
                hoverBg="info600"
                m={{ x: "1rem", y: "1rem" }}
                cursor="pointer"
                rounded="md"
            >
              챔피언
            </Button>
          </Anchor>
        </nav>
      </header>
      <div id="recommend-skin" className="App-header">
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
    </div>
  );
}

export default App;
