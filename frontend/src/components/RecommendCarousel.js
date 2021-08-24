import React from "react";
import { Div } from "atomize";
import Carousel from "./Carousel";
import useDataFetch from "../hooks/useDataFetch";

function RecommendCarousel() {

    const [{isLoading, isError, data : skinList}] = useDataFetch(
        "/api/recommendations",
        []
    );
    
    const flickityOptions = {
        initialIndex: 1,
        wrapAround: true,
        autoPlay: 3000,
        pageDots: false,
    };

    return (<>{
        isLoading ? <p> is loading... </p> :
        isError ? <p> something error </p> :
        <Div maxW="100%">
            <Carousel list={skinList} flktyOption={flickityOptions} cellOption={{ type: "recommend-skins" }} />
        </Div>
    }</>);
}

export default RecommendCarousel;