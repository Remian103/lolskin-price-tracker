import React, { useState, useEffect } from "react";
import { Button, Icon } from "atomize";
import "./css/App.css";

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
    // scroll top when page changed
    const { pathname } = useLocation();
    useEffect(() => {
        console.log(`move to "${pathname}"`)
        window.scrollTo(0, 0);
    }, [pathname]);

    const [anchorList, setList] = useState([]);
    
    const handleTop= () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (<>
        <header className="main-header">
            <Nav anchorList={anchorList} />
        </header>

        <Button className="go-to-top"
            h="2.5rem"
            w="2.5rem"
            bg="info300"
            hoverBg="info400"
            rounded="lg"
            m={{ r: "1rem" }}
            onClick={handleTop}
        >
            <Icon name="UpArrow" size="20px" color="info700" />
        </Button>

        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
                <Home setNav={setList} />
            </Route>
            <Route exact path="/skins/:skinId">
                <Skins setNav={setList} />
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
