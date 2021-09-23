import * as React from "react";
import { useState, useEffect } from "react";
import Flickity, { FlickityOptions } from "react-flickity-component";
import { useHistory } from "react-router-dom";
import { Div } from "atomize";
import "../css/flickity.css";
import "../css/Carousel.css";

interface Props {
    list: any[];
    flktyOption: FlickityOptions;
    cellOption: {
        type: "recommend-skins" | "champion-skins";
    }
}

function Carousel({ list, flktyOption, cellOption }: Props) {
    const history = useHistory();

    // use flickity API
    const [flkty, setFlkty] = useState<undefined | Flickity>(undefined);
    const getFlickityRef = (ref: Flickity) => {
        setFlkty(ref);
    }
    useEffect(() => {
        if (flkty !== undefined) {
            /*
            flkty.on('settle', () => {
                console.log(`current index is ${flkty.selectedIndex}`)
            });
            */

            flkty.on('staticClick', function (event: Event, pointer: Element | Touch, cellElement: Element, cellIndex: number) {
                if (!cellElement) {
                    return;
                }
                history.push(`/skins/${cellElement.id}`);
            });
        }
    }, [flkty, history]);


    // carousel cell design
    const inside = list.map((item) => {
        if (cellOption.type === "recommend-skins") {
            return (
                <Div
                    key={item.id}
                    id={item.id}
                    className="carousel-cell recommand shadowDiv"
                    m={{
                        x: { xs: "0.25rem", md: "1rem" },
                        b: "2rem"
                    }}
                    h={{ xs: "210px", md: "350px" }}
                    w={{ xs: "390px", md: "650px" }}
                >
                    <img
                        src={item.full_image_url}
                        alt={item.name}
                        title={item.name}
                    />
                </Div>
            );
        }
        else if (cellOption.type === "champion-skins") {
            return (
                <Div
                    key={item.id}
                    id={item.id}
                    p={{ x: "1rem" }}
                >
                    <Div
                        className="carousel-cell champion-skin shadowDiv"
                        h={{ xs: "336px", md: "336px" }}
                        w={{ xs: "185px", md: "185px" }}
                        m={{ b: "2rem" }}
                    >
                        <img
                            src={item.trimmed_image_url}
                            alt={item.name}
                            title={item.name}
                        />
                    </Div>
                </Div>
            );
        }
        else return (<></>);
    });

    return (
        <Flickity
            className="carousel"
            options={flktyOption}
            flickityRef={getFlickityRef}
        >
            {inside}
        </Flickity>
    );
}

export default Carousel;