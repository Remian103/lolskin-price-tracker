import React from "react";
import { Div, Icon } from "atomize";
import "../css/Comment.css";

function Comment({ id, comment, like }) {

    return (
        <Div
            className="comment shadowDiv"
            pos="relative"
            m={{y:"0.5rem"}}
            p="1rem"
            bg="white"
            minH="3rem"
            rounded="md"
        >
            <Div
                pos="absolute"
                top="1rem"
                right="1rem"
            >
                {like}
                <Icon name="Heart" size="20px" color="info700" />
            </Div>
            <Div
                p={{r:"4rem"}}
                style={{
                    wordBreak: "break-all"
                }}
            >
                {comment}
            </Div>
        </Div>
    );
}

export default Comment;