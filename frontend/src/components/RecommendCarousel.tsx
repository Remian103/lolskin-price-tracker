import * as React from "react";
import { Div } from "atomize";

import Carousel from "./Carousel";
import useDataFetch from "../hooks/useDataFetch";
import { SkinObj } from "../interfaces/Fetch.interface";

function RecommendCarousel() {

    const [{ isLoading, isError, data: skinList }] = useDataFetch<SkinObj[]>(
        "/api/recommendations",
        []
    );

    return (<>{
        isLoading ? <p> is loading... </p> :
            isError || !Array.isArray(skinList) ? <p> something error </p> :
                <Div maxW="100%">
                    <Carousel list={skinList} type="recommend" />
                </Div>
    }</>);
}

export default RecommendCarousel;