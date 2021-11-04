import * as React from 'react';
import { Div, Text } from 'atomize';

interface Props {
    title?: string
    bgImg?: string
}

function PageTitle({ title, bgImg }: Props) {
    return (
        <>
            <Div
                className="background-skin"
                d={{ xs: bgImg ? 'none' : 'block', md: 'block' }}
                bgImg={bgImg || 'https://store.leagueoflegends.co.kr/assets/bg.jpg'}
            />
            {title
                ? (
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
                            textWeight="700"
                        >
                            {title}
                        </Text>
                    </Div>
                ) : null}

        </>
    );
}
PageTitle.defaultProps = {
    title: undefined,
    bgImg: undefined,
};

export default PageTitle;
