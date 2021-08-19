import React, { useEffect } from "react";
import { Div, Image, Text } from "atomize";
import { useRouteMatch } from "react-router-dom";

import useDataFetch from "../hooks/useDataFetch";
import Carousel from "../components/Carousel";


/**
 * 
 * page for skin information
 * url : /skins/:skinId
 * 
 */

function Skins() {
    const { params } = useRouteMatch("/skins/:skinId");
    useEffect(() => {
        doSkinFetch(`/fastapi/api/skins/${params.skinId}`);
    }, [params]);

    const [{ isLoading, isError, data: skin }, doSkinFetch] = useDataFetch(
        `/fastapi/api/skins/${params.skinId}`,
        {}
    );

    const [{data: championSkinList}, doChampionFetch] = useDataFetch(
        "initialUrl",
        []
    );
    const flickityOptions = {
        initialIndex: 1,
        wrapAround: true,
        autoPlay: 3000,
    };
    useEffect(() => {
        if (skin.champion_id !== undefined) {
            doChampionFetch(`/fastapi/api/champions/${skin.champion_id}/skins`);
        }
    }, [skin]);

    return (<>
        <Div
            pos="fixed"
            w="100%"
            h="100%"
        >
            <Image
                src={skin.full_image_url}
                w="100%"
            />
        </Div>
        <Div p="200px"></Div>
        <Div className="content-container" bg="transparent" /* main content */ >
            <Div className="content-background" bg="black600" />
            <div className="content-title">
                <Text
                    textSize={{ xs: "1rem", md: "1.5rem" }}
                >
                    {skin.name}
                </Text>
            </div>
            <div className="content-title">
                <Text
                    textSize={{ xs: "1rem", md: "1.5rem" }}
                >
                    챔피언의 다른 스킨들
                </Text>
            </div>
            <Div
                p={{y:"1rem"}} 
                w="100%"
            >
                <Carousel list={championSkinList} flktyOption={flickityOptions} cellOption={{ type: "champion-skins" }} />
            </Div>
            <Div
                h="1000px"
                bg="brown"
                textSize="display3"
                textAlign="center"
            >
                Dummy
            </Div>
        </Div>
    </>);
}

export default Skins;