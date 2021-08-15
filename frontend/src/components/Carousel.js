import React, { useState, useEffect } from 'react';
import Flickity from 'react-flickity-component';
import { Div, Anchor } from "atomize";
import '../css/flickity.css';
import '../css/Carousel.css';

function Carousel({ list, option }) {
    const flickityOptions = {
        initialIndex: 1,
        wrapAround: true,
        //autoPlay: 3000,
    };

    // use flickity API
    const [flkty, setFlkty] = useState(undefined);
    const getFlickityRef = (ref) => {
        setFlkty(ref);
    }
    useEffect(() => {
        if (flkty !== undefined) {
            flkty.on('settle', () => {
                console.log(`current index is ${flkty.selectedIndex}`)
            });
        }
    }, [flkty]);


    // carousel cell design
    const inside = list.map((item) => {
        if (option.type === "recommend-skins") {
            return (
                <Anchor
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    d="block"
                    m={{ r: { xs: "0.5rem", md: "2rem" } }}
                >
                    <Div
                        className="carousel-cell"
                        bg="transparent"
                        h={{ xs: "210px", md: "350px" }}
                        w={{ xs: "390px", md: "650px" }}
                    >
                        <img
                            src={item.src}
                            alt={item.description}
                        />
                    </Div>
                </Anchor>
            )
        }
        else if (option.type === "champion-skins") {
            return (
                <Anchor
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    d="block"
                    m={{ r: { xs: "0.5rem", md: "2rem" } }}
                >
                    <Div
                        className="carousel-cell"
                        bg="transparent"
                        h={{ xs: "336px", md: "336px" }}
                        w={{ xs: "185px", md: "185px" }}
                        border="2px solid"
                        borderColor="gold"
                    >
                        <img
                            src={item.src}
                            alt={item.description}
                        />
                    </Div>
                </Anchor>
            )
        }
        else return (<></>);
    });

    return (
        <Div /* responsive */
            p={{ b: "30px" }}
        >
            <Flickity
                className="carousel"
                options={flickityOptions}
                flickityRef={getFlickityRef}
            >
                {inside}
            </Flickity>
        </Div>
    );
}

export default Carousel;