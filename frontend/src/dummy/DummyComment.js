import React, { useState, useEffect, useRef } from "react";
import { Div, Icon, Input, Button } from "atomize";
import "../css/Comment.css";

function DummyComment({ comment, modifyRequest }) {
    useEffect(() => {
        return () => {
            if (process.env.NODE_ENV !== "production")
                console.log("comment update :", comment.comment_id);
        }
    }, [comment]);

    // 좋아요 기능
    const [isLike, setIsLike] = useState(comment.like_state);
    const [likes, setLikes] = useState(comment.likes);
    const handleClickLikeDummy = (event) => {
        event.preventDefault();
        setLikes(prev => isLike ? prev - 1 : prev + 1);
        setIsLike((prev) => !prev);
    };
    const likeString = (num) => {
        if(num >= 1000000) {
            return (num/1000000.0).toFixed(1).toString() + "M"
        }
        else if (num >= 1000) {
            return (num/1000.0).toFixed(1).toString() + "K"
        }
        return num.toString()
    }


    // 댓글 수정
    const [modifyMode, setMode] = useState(false);
    const [content, setContent] = useState(comment.content);
    const inputRef = useRef(null);
    useEffect(() => {
        if (modifyMode) {
            inputRef.current.focus();
        }
    }, [modifyMode]);
    const handleModifyBtn = (event) => {
        event.preventDefault();
        setContent(comment.content);
        setMode(true);
    };
    const handleModifyCancelBtn = (event) => {
        event.preventDefault();
        setMode(false);
    }
    const handleConentChange = (event) => {
        setContent(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (content.length !== 0) {
            modifyRequest(`api/comments/${comment.comment_id}`, { comment_id: comment.comment_id, content: content });
        }
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
                    <Input
                        type="text"
                        ref={inputRef}
                        value={content}
                        onChange={handleConentChange}
                        placeholder={comment.content}
                        p={{ x: "1rem" }}
                    />
                    <Div
                        d="flex"
                        p={{ t: "0.3rem" }}
                        justify="flex-end"
                    >
                        <Button
                            m={{ l: "0.3rem" }}
                            p={{ x: "0.8rem" }}
                            type="submit"
                            h="1.8rem"
                            bg="info700"
                            hoverBg="info800"
                        >
                            수정
                        </Button>
                        <Button
                            m={{ l: "0.3rem" }}
                            p={{ x: "0.8rem" }}
                            h="1.8rem"
                            bg="info700"
                            hoverBg="info800"
                            onClick={handleModifyCancelBtn}
                        >
                            취소
                        </Button>
                    </Div>
                </form>
            </> : <>
                <Div
                    textWeight="500"
                    style={{
                        wordBreak: "break-all"
                    }}
                >
                    {comment.content}
                </Div>
                <Div
                    d="flex"
                    p={{ t: "0.3rem" }}
                    justify="flex-end"
                >
                    {comment.is_modifiable ?
                        <>
                            <Button
                                m={{ l: "0.3rem" }}
                                p={{ x: "0.8rem" }}
                                h="1.8rem"
                                bg="info700"
                                hoverBg="info800"
                                onClick={handleModifyBtn}
                            >
                                수정
                            </Button>
                        </> : <></>
                    }
                    <Button
                        m={{ l: "0.3rem" }}
                        p={{ l: "0.6rem", r:"0.8rem" }}
                        h="1.8rem"
                        bg={isLike ? "danger700" : "info700"}
                        hoverBg={isLike ? "danger700" : "info800"}
                        onClick={handleClickLikeDummy}
                        suffix={
                            <Div
                                d="flex"
                                align="center"
                            >
                                <Icon
                                    m={{ r: "0.1rem" }}
                                    name={isLike ? "HeartSolid" : "Heart"}
                                    size="20px"
                                    color="white"
                                />
                                {likeString(likes)}
                            </Div>
                        }
                    >
                    </Button>
                </Div>
            </>}
        </Div>
    );
}

export default DummyComment;