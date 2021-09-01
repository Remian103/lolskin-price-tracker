import React, { useState, useEffect, useContext } from "react";
import { Div, Button, Icon } from "atomize";
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
import UserContext from "./context/UserContext";
import GoogleLogin from "react-google-login";


function App() {
    // scroll top when page changed
    const { pathname } = useLocation();
    useEffect(() => {
        console.log(`move to "${pathname}"`);
        window.scrollTo(0, 0);
    }, [pathname]);

    const [anchorList, setList] = useState([]);
    
    const handleTop= () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // user information
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [loginButton, setLoginButton] = useState("login");
    // google login
    const googleLoginSuccess = (googleUser) => {
        console.log(googleUser.profileObj);
        setUserInfo({
            ...userInfo,
            userId : googleUser.profileObj.googleId,
            tokenId : googleUser.tokenId,
            name : googleUser.profileObj.name,
            isLogin : true,
        });
    };
    const googleLoginFailure = (response) => {
        console.log(response);
        alert("로그인 중간에 에러가 발생했습니다..");
    };
    const googleLogoutSuccess = (response) => {
        console.log(response);
        setUserInfo({
            ...userInfo,
            userId : null,
            tokenId : null,
            name : null,
            isLogin : false,
        });
        alert("로그아웃 되었습니다.");
    };
    useEffect(() => {
        if(userInfo.isLogin) {
            setLoginButton(`${userInfo.name} 님`);
        }
        else {
            setLoginButton("login");
        }
    }, [userInfo]);

    return (<>
        <header className="main-header">
            <Nav anchorList={anchorList} />
            <Div
                pos="absolute"
                right="8px"
                top="8px"
            >
                <GoogleLogin
                    clientId="183733547550-9ib07k4clf315q8m2vi9ipcujscf7qja.apps.googleusercontent.com"
                    buttonText={loginButton}
                    onSuccess={googleLoginSuccess}
                    isSignedIn={true}
                    onFailure={googleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </Div>
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
