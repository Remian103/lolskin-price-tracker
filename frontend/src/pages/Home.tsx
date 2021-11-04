import React, { useEffect } from 'react';

import PageTitle from '../components/PageTitle';
import ContentContainer from '../components/ContentContainer';
import ContentWrapper from '../components/ContentWrapper';
import RecommendCarousel from '../components/RecommendCarousel';
import ChampBox from '../components/ChampBox';
import { AnchorObj } from '../interfaces/Nav.interface';

function Home({ setNav }: { setNav: React.Dispatch<React.SetStateAction<AnchorObj[]>> }) {
    // header navigation tab
    useEffect(() => {
        setNav([
            { id: 0, name: '홈', link: '/', type: 'link' },
            { id: 1, name: '추천 스킨', link: '#recommend-skins', type: 'hash' },
            { id: 2, name: '챔피언 목록', link: '#champions', type: 'hash' },
            { id: 3, name: '소개', link: '/info', type: 'link' },
        ]);
    }, [setNav]);

    return (
        <>
            <PageTitle title="LoL Price Tracker" />
            <ContentContainer>
                <ContentWrapper id="recommend-skins" title="추천 스킨">
                    <RecommendCarousel />
                </ContentWrapper>
                <ContentWrapper id="champions" title="챔피언 리스트">
                    <ChampBox />
                </ContentWrapper>
            </ContentContainer>
        </>
    );
}

export default Home;
