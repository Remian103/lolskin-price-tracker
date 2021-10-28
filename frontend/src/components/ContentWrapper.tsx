import * as React from 'react';
import { Text } from 'atomize';

interface Props {
    id?: string; // for hash link
    title: string;
    children?: React.ReactNode;
}

function ContentWrapper({ id, title, children }: Props) {
    return (
        <>
            {id === undefined ? null : <div className="hash-link" id={id} />}
            <div className="content-title">
                <Text
                    textSize={{ xs: '1rem', md: '1.5rem' }}
                >
                    {title}
                </Text>
            </div>
            {children}
        </>
    );
}
ContentWrapper.defaultProps = {
    id: undefined,
    children: null,
};

export default ContentWrapper;
