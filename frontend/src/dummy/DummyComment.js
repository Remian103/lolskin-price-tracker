import React, { useState, useEffect } from "react";
import { Div, Icon, Input, Button } from "atomize";
import "../css/Comment.css";

function DummyComment({ comment, modifyRequest }) {
    useEffect(()=> {
        return  ()=>{
            console.log("comment unmount :", comment.comment_id);
        }
    }, [comment]);

    const [isLike, setIsLike] = useState(comment.like_state);
    const [likes, setLikes] = useState(comment.likes);
    
    const handleClickLikeDummy = (event) => {
        event.preventDefault();
        setLikes(prev=>isLike?prev-1:prev+1);
        setIsLike((prev) => !prev);
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
        modifyRequest(`api/comments/${comment.comment_id}`, { comment_id: comment.comment_id, content: content });
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
                    <Icon onClick={handleClickLikeDummy} name={isLike ? "HeartSolid" : "Heart"} size="20px" color="info700" />
                </Div>
                <Div
                    p={{ r: "4rem" }}
                    style={{
                        wordBreak: "break-all"
                    }}
                >
                    {comment.content}
                </Div>
                <Button onClick={handleModifyBtn}>
                    수정
                </Button>
            </>}
        </Div>
    );
}

export default DummyComment;