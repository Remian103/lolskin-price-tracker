import React, { useState, useEffect } from "react";
import { Div, Text, Icon } from "atomize";

function Comment({ id, comment, like }) {
    const [likes, setLike] = useState(like);

    return (
        <Div
            className="shadowDiv"
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
                {likes}
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