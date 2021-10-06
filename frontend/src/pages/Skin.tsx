import React, { useEffect } from "react";
import { Div, Text } from "atomize";
import { useParams } from "react-router-dom";

import ContentContainer from "../components/ContentContainer";
import ContentWrapper from "../components/ContentWrapper";
import useDataFetch from "../hooks/useDataFetch";
import Carousel from "../components/Carousel";
import HistoryChart from "../components/HistoryChart";
import CommentList from "../components/CommentList";
import { AnchorObj } from "../interfaces/Nav.interface";
import { SkinObj, SkinFullObj } from "../interfaces/Fetch.interface";


interface Params {
    skinId: string;
    championId: string;
}

function Skins({ setNav }: { setNav: React.Dispatch<React.SetStateAction<AnchorObj[]>> }) {
    const { skinId, championId } = useParams<Params>();

    // header navigation tab
    useEffect(() => {
        setNav([
            { id: 0, name: "홈", link: "/", type: "link" },
            { id: 1, name: "마이 페이지", link: "/myPage", type: "link" },
            { id: 2, name: "가격 그래프", link: "#chart", type: "hash" },
            { id: 3, name: "다른 스킨들", link: "#other_skins", type: "hash" },
            { id: 4, name: "댓글", link: "#comments", type: "hash" }
        ]);
    }, [setNav]);


    // skin data fetch
    const [{ data: skin }, doSkinFetch] = useDataFetch<SkinFullObj>(
        `/api/skins/${skinId}`,
        {
            id: Number(skinId),
            name: "",
            trimmed_image_url: "",
            full_image_url: "",
            champion_id: Number(championId),
            last_price_history: {
                skin_id: -1,
                date: "",
                price: -1,
                sale_price: -1,
                is_available: false
            },
            description: "",
            price_history: []
        }
    );
    // update when skin id changed
    useEffect(() => {
        if(Number(skinId) !== skin.id) {
            doSkinFetch(`/api/skins/${skinId}`);
        }
    }, [skinId]);


    // skin list of champion
    const [{ data: skinList }, doSkinListFetch] = useDataFetch<SkinObj[]>("initialUrl", []);
    // update when champion id changed
    useEffect(() => {
        doSkinListFetch(`/api/champions/${championId}/skins`);
    }, [championId]);


    return (<>
        <Div className="background-skin" bgImg={skin.full_image_url} />
        <div style={{padding:"200px"}} />

        <ContentContainer className="skins">
            <ContentWrapper id="chart" title={skin.name === "default" ? "기본 스킨" : skin.name}>
                {skin.name === "default" || skin.price_history.length === 0 ? null :
                    <Div p={{
                        x: "1rem",
                        b: "2rem"
                    }}>
                        <HistoryChart className="shadowDiv" priceHistory={skin.price_history} />
                    </Div>
                }
            </ContentWrapper>

            <ContentWrapper id="other_skins" title="챔피언의 다른 스킨들">
                <Carousel list={skinList} type="champion-skins" />
            </ContentWrapper>

            <ContentWrapper id="comments" title="한줄평">
                <Div p={{ x: "1rem" }}>
                    <CommentList skinId={skinId} />
                </Div>
            </ContentWrapper>
        </ContentContainer>
    </>);
}

export default Skins;