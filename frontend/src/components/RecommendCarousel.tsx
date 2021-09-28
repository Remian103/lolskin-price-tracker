import * as React from "react";
import { Div } from "atomize";
import { FlickityOptions } from "react-flickity-component";

import Carousel from "./Carousel";
import useDataFetch from "../hooks/useDataFetch";
import { SkinObj } from "../interfaces/Fetch.interface";

function RecommendCarousel() {

    const [{ isLoading, isError, data: skinList }] = useDataFetch<SkinObj[]>(
        "/api/recommendations",
        []
    );

    const flickityOptions: FlickityOptions = {
        initialIndex: 1,
        wrapAround: true,
        autoPlay: 3000,
        pageDots: false,
    };

    return (<>{
        isLoading ? <p> is loading... </p> :
            isError || !Array.isArray(skinList) ? <p> something error </p> :
                <Div maxW="100%">
                    <Carousel list={skinList} flktyOption={flickityOptions} cellOption={{ type: "recommend-skins" }} />
                </Div>
    }</>);
}

export default RecommendCarousel;