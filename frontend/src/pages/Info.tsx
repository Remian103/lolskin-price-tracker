import * as React from 'react';
import { useEffect } from 'react';
import { Div, Text, Icon, Anchor } from 'atomize';

import PageTitle from '../components/PageTitle';
import ContentContainer from '../components/ContentContainer';
import ContentWrapper from '../components/ContentWrapper';
import { AnchorObj } from '../interfaces/Nav.interface';

/** 개발자 정보 페이지 */
function Info({ setNav }: { setNav: React.Dispatch<React.SetStateAction<AnchorObj[]>> }) {
    // header navigation tab
    useEffect(() => {
        setNav([
            { id: 0, name: '홈', link: '/', type: 'link' },
            { id: 1, name: '소개', link: '/info', type: 'link' },
        ]);
    }, [setNav]);

    return (
        <>
            <Div className="background-skin" bgImg="https://store.leagueoflegends.co.kr/assets/bg.jpg" />
            <PageTitle />

            <ContentContainer>
                <ContentWrapper title="Remian103">
                    <Div p={{ x: '1rem' }}>
                        <Text textSize={{ xs: '1rem', md: '1.5rem' }} textColor="white">Front-End 개발자</Text>
                        <Anchor
                            href="https://github.com/Remian103"
                            target="_blank"
                            rel="noreferrer"
                            textSize={{ xs: '1rem', md: '1.5rem' }}
                            textColor="white"
                            hover
                        >
                            GitHub
                            <Icon
                                name="RightArrowSolid"
                                size={{ xs: '1rem', md: '1.5rem' }}
                                color="white"
                                transform="translate(10%, 15%)"
                            />
                        </Anchor>
                    </Div>
                </ContentWrapper>
                <ContentWrapper title="jiyolla">
                    <Div p={{ x: '1rem' }}>
                        <Text textSize={{ xs: '1rem', md: '1.5rem' }} textColor="white">Back-End 개발자</Text>
                        <Anchor
                            href="https://github.com/jiyolla"
                            target="_blank"
                            rel="noreferrer"
                            textSize={{ xs: '1rem', md: '1.5rem' }}
                            textColor="white"
                        >
                            GitHub
                            <Icon
                                name="RightArrowSolid"
                                size={{ xs: '1rem', md: '1.5rem' }}
                                color="white"
                                transform="translate(10%, 15%)"
                            />
                        </Anchor>
                    </Div>
                </ContentWrapper>
            </ContentContainer>
        </>
    );
}

export default Info;
