import React, { useState, useEffect } from 'react';
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



    const [anchorList, setList] = useState([]);

    return (<>
        <header className="main-header">
            <Nav anchorList={anchorList} />
        </header>

        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
                <Home setNav={setList}/>
            </Route>
            <Route exact path="/skins/:skinId">
                <Skins setNav={setList}/>
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
