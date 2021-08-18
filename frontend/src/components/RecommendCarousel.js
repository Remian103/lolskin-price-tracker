import React from "react";
import { Div, Text } from "atomize";
import Carousel from "./Carousel";
import useDataFetch from "../hooks/useDataFetch";

function RecommendCarousel() {

    const [{isLoading, isError, data : skinList}, _] = useDataFetch(
        "/fastapi/api/recommendations",
        []
    );
    
    const flickityOptions = {
        initialIndex: 1,
        wrapAround: true,
        autoPlay: 3000,
    };

    return (<>{
        isLoading ? <p> is loading... </p> :
        isError ? <p> something error </p> :
        <Div w="100%">
            <Carousel list={skinList} flktyOption={flickityOptions} cellOption={{ type: "recommend-skins" }} />
        </Div>
    }</>);
}

export default RecommendCarousel;