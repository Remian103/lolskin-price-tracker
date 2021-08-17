import React, { useState, useEffect } from "react";
import { Div, Text, Button, Icon } from "atomize";
import Carousel from "./Carousel";
import useDataFetch from "../hooks/useDataFetch";
import "../css/ChampBox.css";

function ChampBox({ list }) {

    const [display, setDisplay] = useState(false);
    const [skinList, setList] = useState([]);
    const [{isLoading, isError, data}, doFetch] = useDataFetch("initialUrl", []);
    const onClick = () => {
        setDisplay((prev) => !prev);
    }

    useEffect(() => {
        if (display)
            doFetch(`/fastapi/api/champions/266/skins`);
    }, [display]);

    useEffect(() => {
        setList(data);
    }, [data])

    const items = list.map((item) =>
        <Div
            key={item.id}
            p="0.5rem"
        >
            <img src={item.src} alt={item.description} title={item.description} onClick={() => setDisplay((prev) => !prev)} />
        </Div>
    );

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
                Champion List
            </Text>
        </Div>
        <Div
            d="flex"
            flexWrap="wrap"
            w="100%"
            maxW="1024px"
            p="0.5rem"
        >
            {items}
        </Div>
        
        {/* silde in out css */}
        <Div className={"transition-slide" + (display ? " in" : "")}>
            {!display ? <></> :
                isLoading ? <p> is loading... </p> :
                isError ? <p> something error </p> :
                <>
                    <Button
                        pos="absolute"
                        right="0.5rem"
                        top="0.5rem"
                        h="2.5rem"
                        w="2.5rem"
                        bg="warning700"
                        hoverBg="warning600"
                        rounded="circle"
                        shadow="2"
                        hoverShadow="4"
                        onClick={onClick}
                    >
                        <Icon name="Cross" size="20px" color="white" />
                    </Button>
                    <Carousel list={skinList} option={{ type: "champion-skins" }} />
                </>
            }
        </Div>
    </>);
}

export default ChampBox;