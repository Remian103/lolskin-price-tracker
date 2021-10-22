import React, { useEffect, useContext } from 'react';
import { Div } from 'atomize';

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
        ]);
    }, [setNav]);

    return (
        <>
            <Div className="background-skin" bgImg="https://store.leagueoflegends.co.kr/assets/bg.jpg" />

            <ContentContainer className="skins">
                <ContentWrapper title={userInfo.isLogin ? `My Page ${userInfo.name}` : '로그인을 해주세요!'} />
            </ContentContainer>
        </>
    );
}

export default MyPage;
