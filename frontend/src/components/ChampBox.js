import React, { useState, useEffect } from "react";
import { Div, Button, Icon } from "atomize";
import Carousel from "./Carousel";
import "../css/ChampBox.css";

function ChampBox({ list }) {

    const [display, setDisplay] = useState(false);
    const onClick = () => {
        setDisplay((prev) => !prev);
    }

    // carousel test
    const skinList = [
        { id: 0, src: "/images/thumb-1920-328327.jpg", description: "thumb-1920-328327.jpg" },
        { id: 1, src: "/images/thumb-1920-533923.jpg", description: "thumb-1920-533923.jpg" },
        { id: 2, src: "/images/thumb-1920-536426.png", description: "thumb-1920-536426.png" },
        { id: 3, src: "/images/thumb-1920-627080.png", description: "thumb-1920-627080.png" },
        { id: 4, src: "/images/thumb-1920-328327.jpg", description: "thumb-1920-328327.jpg" },
        { id: 5, src: "/images/thumb-1920-533923.jpg", description: "thumb-1920-533923.jpg" },
        { id: 6, src: "/images/thumb-1920-536426.png", description: "thumb-1920-536426.png" },
        { id: 7, src: "/images/thumb-1920-627080.png", description: "thumb-1920-627080.png" }
    ];

    useEffect(() => { }, []);

    const items = list.map((item) =>
        <Div
            key={item.id}
        >
            <img src={item.src} alt={item.description} title={item.description} onClick={onClick} />
        </Div>
    );

    return (<>
        <Div
            d="flex"
            flexWrap="wrap"
            w="100%"
            maxW="1024px"
            bg="black600"
            p="1rem"
        >
            {items}
        </Div>
        
        {/* silde in out css */}
        <div className={display ? "in" : "out"} >
            <Div className="transition-slide">
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
                        <Carousel list={skinList} option={{ type: "recommend-skins" }} />
                    </>
                }
            </Div>
        </div>
    </>);
}

export default ChampBox;