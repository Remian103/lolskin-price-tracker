import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Div, Button, Icon, Image, Text } from 'atomize';
import './css/App.css';
import jwt from 'jwt-decode';

// route
import { Route, Switch, useLocation, useHistory, Link } from 'react-router-dom';

import Nav from './components/Nav';
import { AnchorObj } from './interfaces/Nav.interface';
import Home from './pages/Home';
import Skin from './pages/Skin';
import MyPage from './pages/MyPage';
import UserContext from './context/UserContext';
import config from './config.json';

interface LocationParams {
    pathname: string;
}

function App() {
    // scroll top when page changed
    const { pathname } = useLocation<LocationParams>();
    const history = useHistory();
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') console.log(`move to "${pathname}"`);
        window.scrollTo(0, 0);
    }, [pathname]);

    const [anchorList, setList] = useState<AnchorObj[]>([]);

    const handleTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // user information
    const { userInfo, setUserInfo } = useContext(UserContext);

    // google login callback
    function handleCredentialResponse(response: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(response);
            console.log(`Encoded JWT ID token: ${response.credential}`);
            console.log(jwt(response.credential));
        }
        interface GoogleCredential {
            aud: string;
            azp: string;
            email: string;
            email_verified: boolean;
            exp: number;
            family_name: string;
            given_name: string;
            iat: number;
            iss: string;
            jti: string;
            name: string;
            nbf: number;
            picture: string;
            sub: string;
        }
        const decodedCredential: GoogleCredential = jwt(response.credential);
        setUserInfo({
            userId: decodedCredential.sub,
            tokenId: response.credential,
            name: decodedCredential.name,
            imageUrl: decodedCredential.picture,
            isLogin: true,
        });
    }
    // google one tap display
    const [ready, setReady] = useState(false);
    useEffect(() => {
        window.onload = () => {
            window.google.accounts.id.initialize({
                client_id: config.googleAPI.clientId,
                auto_select: true,
                callback: handleCredentialResponse,
            });
            setReady(true);
            window.google.accounts.id.prompt(); // also display the One Tap dialog
        };
    }, []);
    useEffect(() => {
        if (ready && window.google && !userInfo.isLogin) {
            window.google.accounts.id.renderButton(
                document.getElementById('googleLoginBtn'),
                { theme: 'filled_blue', size: 'large' }, // customization attributes
            );
            window.google.accounts.id.renderButton(
                document.getElementById('googleLoginBtnMobile'),
                { theme: 'filled_blue', size: 'large' }, // customization attributes
            );
        }
    }, [ready, userInfo.isLogin]);

    const googleLogOut = (
        <>
            <Div m={{ l: 'auto', r: '8px' }}>
                <Button
                    bg="info700"
                    hoverBg="info600"
                    cursor="pointer"
                    rounded="md"
                    onClick={() => {
                        setUserInfo({
                            ...userInfo,
                            userId: null,
                            tokenId: null,
                            name: null,
                            isLogin: false,
                        });
                        window.google.accounts.id.disableAutoSelect();
                        window.location.reload();
                    }}
                >
                    LogOut
                </Button>
            </Div>
            <Image
                src={userInfo.imageUrl}
                m={{ r: '8px' }}
                h="40px"
                w="40px"
                rounded="circle"
                cursor="pointer"
                onClick={() => {
                    history.push('/mypage');
                }}
            />
        </>
    );

    const handleOnClickMenu = () => {
        alert('test');
    };

    return (
        <>
            <header className="main-header">
                <Nav anchorList={anchorList} />
                {userInfo.isLogin ? (
                    googleLogOut
                ) : (
                    <div
                        id="googleLoginBtn"
                        style={{ marginLeft: 'auto', marginRight: '10px' }}
                    />
                )}
            </header>
            <header className="mobile-header">
                <Link to="/" style={{ margin: '8px 0 8px 8px' }}>
                    <Text m="" textColor="white" textSize="20px">
                        {' '}
                        LeagueDB
                        {' '}
                    </Text>
                </Link>
                {userInfo.isLogin ? (
                    googleLogOut
                ) : (
                    <div
                        id="googleLoginBtnMobile"
                        style={{ marginLeft: 'auto', marginRight: '10px' }}
                    />
                )}
                <Icon
                    m="8px 8px 8px 0"
                    name="Menu"
                    size="40px"
                    color="white"
                    onClick={handleOnClickMenu}
                />
            </header>

            <Button
                className="go-to-top"
                h="2.5rem"
                w="2.5rem"
                bg="info300"
                hoverBg="info400"
                rounded="lg"
                m={{ r: '1rem' }}
                onClick={handleTop}
            >
                <Icon name="UpArrow" size="20px" color="info700" />
            </Button>

            <Switch>
                <Route exact path="/">
                    <Home setNav={setList} />
                </Route>
                <Route exact path="/champions/:championId/skins/:skinId">
                    <Skin setNav={setList} />
                </Route>
                <Route exact path="/skins">
                    <p>skin page</p>
                </Route>
                <Route exact path="/myPage">
                    <MyPage setNav={setList} />
                </Route>
                <Route path="/">
                    <p>404 error</p>
                </Route>
            </Switch>
        </>
    );
}

export default App;
