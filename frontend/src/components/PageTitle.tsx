import * as React from 'react';
import { Div, Text } from 'atomize';

function PageTitle() {
    return (
        <>
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
        </>
    );
}
export default PageTitle;
