import React, { useEffect, useContext } from "react";
import { Div, Text } from "atomize";

import ContentContainer from "../components/ContentContainer";
import ContentWrapper from "../components/ContentWrapper";
import UserContext from "../context/UserContext";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import { AnchorObj } from "../interfaces/Nav.interface";


function MyPage({ setNav }: { setNav: React.Dispatch<React.SetStateAction<AnchorObj[]>> }) {
    const { userInfo } = useContext(UserContext);

    // header navigation tab
    useEffect(() => {
        setNav([
            { id: 0, name: "홈", link: "/", type: "link" },
        ]);
    }, [setNav]);


    return (<>
        <Div className="background-skin" bgImg="https://store.leagueoflegends.co.kr/assets/bg.jpg" />

        {userInfo.isLogin ?
            <>
                <div style={{padding:"200px"}} />

                <ContentContainer className="skins">
                    <ContentWrapper title={`My Page ${userInfo.name}`} />
                </ContentContainer>
            </> : 
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
        }
    </>);
}

export default MyPage;