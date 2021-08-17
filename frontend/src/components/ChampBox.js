import React, { useState, useEffect, useMemo } from "react";
import { Div, Text, Button, Icon } from "atomize";
import Carousel from "./Carousel";
import "../css/ChampBox.css";

function ChampBox({ list }) {

    const [display, setDisplay] = useState(false);
    const onClick = () => {
        setDisplay((prev) => !prev);
    }

    const url = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/";
    // carousel test
    const skinList = [
        { id: 0, src: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg", description: "thumb-1920-328327.jpg", href:"/skins" },
        { id: 1, src: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_1.jpg", description: "thumb-1920-533923.jpg", href:"/skins" },
        { id: 2, src: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_2.jpg", description: "thumb-1920-536426.png", href:"/skins" },
        { id: 3, src: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_3.jpg", description: "thumb-1920-627080.png", href:"/skins" },
        { id: 4, src: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_7.jpg", description: "thumb-1920-328327.jpg", href:"/skins" },
        { id: 5, src: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_8.jpg", description: "thumb-1920-533923.jpg", href:"/skins" },
        { id: 6, src: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_9.jpg", description: "thumb-1920-536426.png", href:"/skins" },
        { id: 7, src: "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_11.jpg", description: "thumb-1920-627080.png", href:"/skins" }
    ];

    useEffect(() => { }, []);

    const items = list.map((item) =>
        <Div
            key={item.id}
            p="0.5rem"
        >
            <img src={item.src} alt={item.description} title={item.description} onClick={onClick} />
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