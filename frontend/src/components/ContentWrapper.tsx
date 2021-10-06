import * as React from "react";
import { Text } from "atomize";

interface Props {
    id?: string; // for hash link
    title: string;
    children?: React.ReactNode;
}

function ContentWrapper(props: Props) {

    return (<>
        {props.id === undefined ? null : <div className="hash-link" id={props.id} />}
        <div className="content-title">
            <Text
                textSize={{ xs: "1rem", md: "1.5rem" }}
            >
                {props.title}
            </Text>
        </div>
        {props.children}
    </>)
}

export default ContentWrapper;