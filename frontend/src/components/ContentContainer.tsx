import * as React from "react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

function ContentContainer(props: Props) { 
    return (
        <div className={props.className === undefined ? "content-container" : "content-container " + props.className} /* main content */ >
            <div className="content-background" /* background */ />
            {props.children}
        </div>
    )
}

export default ContentContainer;