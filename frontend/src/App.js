import React, { useState, useEffect, useContext } from "react";
import { Div, Button, Icon, Image } from "atomize";
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
import MyPage from "./pages/MyPage";
import UserContext from "./context/UserContext";
import GoogleLoginBtn from "./components/GoogleLoginBtn";


function App() {
    // scroll top when page changed
    const { pathname } = useLocation();
    useEffect(() => {
        console.log(`move to "${pathname}"`);
        window.scrollTo(0, 0);
    }, [pathname]);

    const [anchorList, setList] = useState([]);

    const handleTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // user information
    const { userInfo, setUserInfo } = useContext(UserContext);

    //google Logout
    const [logOutBtnDisabled, setLogOutBtnDisabled] = useState(false);
    const LogOutBtnClick = async () => {
        setLogOutBtnDisabled(true);
        await window.gapi.auth2.getAuthInstance().signOut()
            .then(() => {
                setUserInfo({
                    ...userInfo,
                    userId: null,
                    tokenId: null,
                    name: null,
                    isLogin: false,
                });
                alert("로그아웃 되었습니다.");
            })
            .catch((error) => {
                console.log(error);
                alert("비정상적 로그아웃 발생");
            });
        setLogOutBtnDisabled(false);
    }


    return (<>
        <header className="main-header">
            <Nav anchorList={anchorList} />
            <Div
                pos="absolute"
                d="flex"
                align="center"
                right="0"
                top="0"
                h="56px"
            >
                {userInfo.isLogin ?
                    <>
                        <Div
                            m={{ r: "8px" }}
                        >
                            <Button
                                bg="info700"
                                hoverBg="info600"
                                cursor="pointer"
                                rounded="md"
                                disabled={logOutBtnDisabled}
                                onClick={LogOutBtnClick}
                            >
                                LogOut
                            </Button>
                        </Div>
                        <Image
                            src={userInfo.imageUrl}
                            m={{ r: "8px" }}
                            h="40px"
                            rounded="circle"
                        />
                    </> :
                    <Div
                        m={{ r: "8px" }}
                    >
                        <GoogleLoginBtn />
                    </Div>
                }
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
            <Route exect path="/myPage">
                <MyPage setNav={setList} />
            </Route>
            <Route path="/">
                <p>404 error</p>
            </Route>
        </Switch>
    </>);
}

export default App;
