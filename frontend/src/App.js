import React, { useEffect } from 'react';
import './css/App.css';

// route
import {
    Route,
    Redirect,
    Switch,
    useLocation
} from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Skins from "./pages/Skins";

function App() {
    // scroll top
    const { pathname } = useLocation();
    useEffect(() => {
        console.log(`move to "${pathname}"`)
        window.scrollTo(0, 0);
    }, [pathname]);

    const anchorList = [
        { id: 0, name: "홈", link: "/home", type: "link" },
        { id: 1, name: "추천 스킨", link: "#recommend-skins", type: "hash" },
        { id: 2, name: "챔피언 목록", link: "#champions", type: "hash" },
        { id: 3, name: "새 페이지", link: "/skins", type: "new-tab" }
    ];

    return (<>
        <header className="main-header">
            <Nav anchorList={anchorList} />
        </header>

        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
                <Home />
            </Route>
            <Route exact path="/skins/:skinId">
                <Skins />
            </Route>
            <Route exect path="/skins">
                <p>skin page</p>
            </Route>
            <Route path="/">
                <p>404 error</p>
            </Route>
        </Switch>
    </>);
}

export default App;
