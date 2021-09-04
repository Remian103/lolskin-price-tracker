import React, { useState, useContext } from "react";
import { Div, Icon } from "atomize";
import axios from "axios";
import "../css/Comment.css";

import UserContext from "../context/UserContext";

function Comment({ skinId, commentId, comment, like, apiList }) {
    const [userInfo] = useContext(UserContext);

    const [isLike, setIsLike] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleClickLike = async (event) => {
        event.preventDefault();
        if (isLoading) return;

        setLoading(true);
        const request = isLike ? axios.delete : axios.post;
        await request(`api/comments/${commentId}/like`,
            {
                token_id: userInfo.tokenId
            }
        ).then((response) => {
            console.log(response);
            const { like_num, success } = response.data;

            if (success) {
                setIsLike((prev) => !prev);
            }
        }).catch((error) => {
            console.log(`error in comment_id:${commentId}, skin_id:${skinId}\n`, error);
        });

        setLoading(false);
    };


    return (
        <Div
            key={commentId}
            className="comment shadowDiv"
            pos="relative"
            m={{ y: "0.5rem" }}
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
                <Icon onClick={handleClickLike} name={isLike ? "HeartSolid" : "Heart"} size="20px" color="info700" />
            </Div>
            <Div
                p={{ r: "4rem" }}
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