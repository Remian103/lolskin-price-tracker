import React, { useEffect } from "react";
import { Div, Text } from "atomize";

import ContentContainer from "../components/ContentContainer";
import ContentWrapper from "../components/ContentWrapper";
import RecommendCarousel from "../components/RecommendCarousel";
import ChampBox from "../components/ChampBox";
import { AnchorObj } from "../interfaces/Nav.interface";


function Home({ setNav }: { setNav: React.Dispatch<React.SetStateAction<AnchorObj[]>> }) {
    // header navigation tab
    useEffect(() => {
        setNav([
            { id: 0, name: "홈", link: "/", type: "link" },
            { id: 1, name: "마이 페이지", link: "/myPage", type: "link" },
            { id: 2, name: "추천 스킨", link: "#recommend-skins", type: "hash" },
            { id: 3, name: "챔피언 목록", link: "#champions", type: "hash" },
            { id: 4, name: "새 페이지 테스트", link: "/skins", type: "new-tab" }
        ]);
    }, [setNav]);

    return (<>
        <Div className="background-skin" bgImg="https://store.leagueoflegends.co.kr/assets/bg.jpg" />

        <Div /* title */
            d="flex"
            h={{ xs: "150px", md: "400px" }}
            align="center"
            justify="center"
            flexDir="column"
        >
            <Text
                p={{ l: "0.5rem", r: "0.5rem" }}
                textSize="display3"
                textAlign="center"
                textColor="white"
            >
                LOL PRICE TRACKER
            </Text>
        </Div>

        <ContentContainer>
            <ContentWrapper id="recommend-skins" title="추천 스킨">
                <RecommendCarousel />
            </ContentWrapper>
            <ContentWrapper id="champions" title="챔피언 리스트">
                <ChampBox />
            </ContentWrapper>
        </ContentContainer>
    </>);
}

export default Home;