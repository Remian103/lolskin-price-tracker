import React from "react";
import { Div, Text } from "atomize";
import Carousel from "./Carousel";

function CarouselWrapper({ title, list, option }) {


    return (<>
        <div id="recommend-skins"></div> {/* id로 이동하는거 react에서 권장하지 않는듯? 임시로.. */}
        <Div
            w="100%"
            maxW="1024px"
            p={{
                t: { xs: "64px", md: "64px" }, // header height + 8px
                l: "8px",
                b: "8px"
            }}
        >
            <Text
                textSize={{ xs: "1rem", md: "1.5rem" }}
            >
                {title}
            </Text>
        </Div>
        <Div
            w="100%"
        >
            <Carousel list={list} option={option} />
        </Div>
    </>);
}

export default CarouselWrapper;