import React, { useState, useEffect } from "react";
import { Div, Text, Button, Icon } from "atomize";
import Carousel from "./Carousel";
import useDataFetch from "../hooks/useDataFetch";
import "../css/ChampBox.css";

function ChampBox() {

    const [display, setDisplay] = useState(false);
    const [champId, setId] = useState(0);
    const [{isLoading: skinLoading, isError: skinError, data: skinList}, doFetch] = useDataFetch("initialUrl", []);
    const [{isLoading: champLoading, isError: champError, data: champList}, _] = useDataFetch("/fastapi/api/champions", []);

    useEffect(() => {
        if (display)
            doFetch(`/fastapi/api/champions/${champId}/skins`);
    }, [display, champId, doFetch]);
    
    //test log
    useEffect(() => {
        console.log(skinList);
    }, [skinList]);
    useEffect(() => {
        console.log(champList);
    }, [champList]);

    const items = champList.map((item) =>
        <Div
            key={item.id}
            p="0.5rem"
        >
            <img src={item.icon_url}
                alt={item.name}
                title={item.name}
                onClick={() => {setDisplay(true); setId(item.id);}}
            />
        </Div>
    );

    return (<>
        <Div
            w="100%"
            maxW="1024px"
            p={{ t: "32px", l: "1rem", b: "1rem" }}
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
                skinLoading ? <p> is loading... </p> :
                skinError ? <p> something error </p> :
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
                        onClick={() => setDisplay(false)}
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