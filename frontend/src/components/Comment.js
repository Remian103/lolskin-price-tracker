import React, { useState, useContext } from "react";
import { Button, Div, Icon, Input } from "atomize";
import axios from "axios";
import "../css/Comment.css";

import UserContext from "../context/UserContext";

function Comment({ comment, modifyRequest }) {
    const { userInfo } = useContext(UserContext);

    const [isLike, setIsLike] = useState(comment.like_state);
    const [likes, setLikes] = useState(comment.likes);
    const [isLoading, setLoading] = useState(false);

    const handleClickLike = async (event) => {
        event.preventDefault();
        if (isLoading) return;
        if (!userInfo.isLogin) {
            alert("로그인 후에 이용하실 수 있습니다.");
            return;
        }

        setLoading(true);

        const request = isLike ? axios.delete : axios.post;
        await request(`api/comments/${comment.comment_id}/like`, null,
            { headers: { Authorization: `Bearer ${userInfo.tokenId}` } }
        ).then((response) => {
            if (process.env.NODE_ENV !== "production") console.log(response);
            const { likes } = response.data;

            setIsLike((prev) => !prev);
            setLikes(likes);
        }).catch((error) => {
            console.log(`error in comment_id:${comment.comment_id}\n`, error);
        });

        setLoading(false);
    };

    const [modifyMode, setMode] = useState(false);
    const [content, setContent] = useState(comment.content);
    const handleModifyBtn = (event) => {
        event.preventDefault();
        setContent(comment.content);
        setMode(true);
    };
    const handleConentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        modifyRequest(`api/comments/${comment.comment_id}`, { content: content });
        setMode(false);
    };

    return (
        <Div className="comment-animation shadowDiv"
            pos="relative"
            m={{ y: "0.5rem" }}
            p="1rem"
            bg="white"
            minH="3rem"
            rounded="md"
        >
            {modifyMode ? <>
                <form
                    onSubmit={handleSubmit}
                >
                    <Input className="shadowDiv"
                        type="text"
                        value={content}
                        onChange={handleConentChange}
                        placeholder="comment here!"
                        p={{ l: "1rem", r: "6rem" }}
                        suffix={
                            <Button
                                pos="absolute"
                                type="submit"
                                bg="info700"
                                hoverBg="info800"
                                top="0"
                                right="0"
                                rounded={{ r: "md" }}
                            >
                                수정
                            </Button>
                        }
                    />
                </form>
            </> : <>
                <Div
                    pos="absolute"
                    top="1rem"
                    right="1rem"
                >
                    {likes}
                    <Icon onClick={handleClickLike} name={isLike ? "HeartSolid" : "Heart"} size="20px" color="info700" />
                </Div>
                <Div
                    p={{ r: "4rem" }}
                    style={{
                        wordBreak: "break-all"
                    }}
                >
                    {comment.content}
                </Div>
                {comment.is_modifiable ?
                    <Button onClick={handleModifyBtn}>
                        수정
                    </Button> : <></>
                }
            </>}
        </Div>
    );
}

export default Comment;