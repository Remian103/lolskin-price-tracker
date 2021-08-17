import React from "react";
import { Div, Text } from "atomize";
import Carousel from "./Carousel";

function CarouselWrapper({ title, list, option }) {


    return (<>
        <Div
            w="100%"
            maxW="1024px"
            p={{
                t: "32px",
                l: "1rem",
                b: "1rem"
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