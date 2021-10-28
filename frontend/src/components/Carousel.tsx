import * as React from 'react';
import { useState, useEffect } from 'react';
import Flickity, { FlickityOptions } from 'react-flickity-component';
import { useHistory } from 'react-router-dom';
import { Div } from 'atomize';
import '../css/flickity.css';
import '../css/Carousel.css';
import { SkinObj } from '../interfaces/Fetch.interface';

// 타입 추가될 때마다 추가
interface SkinObjProp {
    list: SkinObj[];
    type: 'champion-skins' | 'recommend';
}
interface TestDummy {
    list: any[];
    type: 'dummy';
}
type Props =
    | SkinObjProp
    | TestDummy;

function Carousel(props: Props) {
    const history = useHistory();

    // use flickity API
    const [flkty, setFlkty] = useState<undefined | Flickity>(undefined);
    const getFlickityRef = (ref: Flickity) => {
        setFlkty(ref);
    };
    useEffect(() => {
        if (flkty !== undefined && props.list.length !== 0) {
            if (props.type === 'recommend' || props.type === 'champion-skins') {
                flkty.on('staticClick', (event: Event, pointer: Element | Touch, cellElement: Element, cellIndex: number) => {
                    if (!cellElement) {
                        return;
                    }
                    const item = props.list[cellIndex];
                    history.push(`/champions/${item.champion_id}/skins/${item.id}`);
                });
            }
        }
    }, [flkty, props]);

    const setFlickity = (): [FlickityOptions, React.ReactNode[]] => {
        switch (props.type) {
            case 'recommend':
                return [
                    {
                        initialIndex: 1,
                        wrapAround: true,
                        autoPlay: 3000,
                        pageDots: false,
                    },
                    props.list.map((item) => (
                        <Div
                            key={item.id}
                            id={item.id}
                            className="carousel-cell recommand shadowDiv"
                            m={{
                                x: { xs: '0.25rem', md: '1rem' },
                                b: '2rem',
                            }}
                            h={{ xs: '210px', md: '350px' }}
                            w={{ xs: '390px', md: '650px' }}
                        >
                            <img
                                src={item.full_image_url}
                                alt={item.name}
                                title={item.name}
                            />
                        </Div>
                    )),
                ];
            case 'champion-skins':
                return [
                    {
                        initialIndex: 0,
                        cellAlign: 'left',
                        contain: true,
                        pageDots: false,
                        // wrapAround: true,
                        // autoPlay: 3000,
                    },
                    props.list.map((item) => (
                        <Div
                            key={item.id}
                            id={item.id}
                            p={{ x: '1rem' }}
                        >
                            <Div
                                className="carousel-cell champion-skin shadowDiv"
                                h={{ xs: '336px', md: '336px' }}
                                w={{ xs: '185px', md: '185px' }}
                                m={{ b: '2rem' }}
                            >
                                <img
                                    src={item.trimmed_image_url}
                                    alt={item.name}
                                    title={item.name}
                                />
                            </Div>
                        </Div>
                    )),
                ];
            default:
                return [{}, [<></>]];
        }
    };
    const [flktyOption, inside] = setFlickity();

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
