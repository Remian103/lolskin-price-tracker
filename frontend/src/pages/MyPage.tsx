import React, { useEffect, useContext } from 'react';
import { Div, Text } from 'atomize';

import ContentContainer from '../components/ContentContainer';
import ContentWrapper from '../components/ContentWrapper';
import UserContext from '../context/UserContext';
import { AnchorObj } from '../interfaces/Nav.interface';

function MyPage({ setNav }: { setNav: React.Dispatch<React.SetStateAction<AnchorObj[]>> }) {
    const { userInfo } = useContext(UserContext);

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
            <Div /* title */
                d="flex"
                h={{ xs: '150px', md: '400px' }}
                align="center"
                justify="center"
                flexDir="column"
            >
                <Text
                    p={{ l: '0.5rem', r: '0.5rem' }}
                    textSize={{ xs: 'display2', md: 'display3' }}
                    textAlign="center"
                    textColor="white"
                >
                    LoL Price Tracker
                </Text>
            </Div>

            <ContentContainer>
                <ContentWrapper title={userInfo.isLogin ? `My Page ${userInfo.name}` : '로그인을 해주세요!'} />
            </ContentContainer>
        </>
    );
}

export default MyPage;
