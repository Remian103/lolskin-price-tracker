import * as React from 'react';
import { Div } from 'atomize';

import Carousel from './Carousel';
import useDataFetch from '../hooks/useDataFetch';
import { SkinObj } from '../interfaces/Fetch.interface';
import api from '../config.json';

function RecommendCarousel() {
    const [{ isLoading, isError, data: skinList }] = useDataFetch<SkinObj[]>(
        `${api.backendAPI}/api/recommendations`,
        [],
    );

    const errorHandleDom = (loading : boolean) => {
        if (loading) return <p> is loading... </p>;
        return <p> something error </p>;
    };

    return (
        <>
            {
                isLoading || isError || !Array.isArray(skinList)
                    ? errorHandleDom(isLoading)
                    : (
                        <Div maxW="100%">
                            <Carousel list={skinList} type="recommend" />
                        </Div>
                    )

            }
        </>
    );
}

export default RecommendCarousel;
