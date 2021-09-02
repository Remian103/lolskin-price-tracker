import React, { useEffect, useContext } from "react";
import { Div, Text } from "atomize";

import UserContext from "../context/UserContext";
import GoogleLoginBtn from "../components/GoogleLoginBtn";



function MyPage({ setNav }) {
    const [userInfo] = useContext(UserContext);

    // header navigation tab
    useEffect(() => {
        setNav([
            { id: 0, name: "홈", link: "/home", type: "link" },
        ]);
    }, [setNav]);

    const loginPage = <>
        <GoogleLoginBtn />
    </>;
    const myPage = <>
        <div className="content-title">
            <Text
                textSize={{ xs: "1rem", md: "1.5rem" }}
            >
                {`My Page ${userInfo.name}`}
            </Text>
        </div>
    </>;

    return (<>
        <Div className="background-skin" bgImg="https://store.leagueoflegends.co.kr/assets/bg.jpg" />

        <Div p="200px"></Div>

        <div className="content-container skins" /* main content */ >
            <div className="content-background" />

            {userInfo.isLogin ? myPage : loginPage}
        </div>
    </>);
}

export default MyPage;