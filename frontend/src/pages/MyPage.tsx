import React, { useEffect, useContext } from "react";
import { Div, Text } from "atomize";

import UserContext from "../context/UserContext";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import { AnchorObj } from "../interfaces/Nav.interface";


function MyPage({ setNav }: { setNav: React.Dispatch<React.SetStateAction<AnchorObj[]>> }) {
    const { userInfo } = useContext(UserContext);

    // header navigation tab
    useEffect(() => {
        setNav([
            { id: 0, name: "홈", link: "/home", type: "link" },
        ]);
    }, [setNav]);

    const loginPage = <>
        <Div
            pos="fixed"
            top="0"
            right="0"
            bottom="0"
            left="0"
            d="flex"
            align="center"
            justify="center"
        >
            <GoogleLoginBtn />
        </Div>
    </>;
    const myPage = <>
        <Div p="200px"></Div>

        <div className="content-container skins" /* main content */ >
            <div className="content-background" />
            <div className="content-title">
                <Text
                    textSize={{ xs: "1rem", md: "1.5rem" }}
                >
                    {`My Page ${userInfo.name}`}
                </Text>
            </div>
        </div>
    </>;

    return (<>
        <Div className="background-skin" bgImg="https://store.leagueoflegends.co.kr/assets/bg.jpg" />

        {userInfo.isLogin ? myPage : loginPage}
    </>);
}

export default MyPage;