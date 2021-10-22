import * as React from 'react';

interface Props {
    className?: string;
    children?: React.ReactNode;
}

function ContentContainer({ className, children } : Props) {
    return (
        <div className={className === undefined ? 'content-container' : `content-container ${className}`}>
            <div className="content-background" /* background */ />
            {children}
        </div>
    );
}
ContentContainer.defaultProps = {
    className: undefined,
    children: null,
};

export default ContentContainer;
