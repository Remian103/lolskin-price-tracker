import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Div, Icon, Input } from "atomize";
import axios from "axios";
import "../css/Comment.css";

import UserContext from "../context/UserContext";

function Comment({ comment, modifyRequest, deleteRequest }) {
    const { userInfo } = useContext(UserContext);


    // 좋아요 기능
    const [isLike, setIsLike] = useState(comment.like_state);
    const [likes, setLikes] = useState(comment.likes);
    const [isLikeLoading, setLikeLoading] = useState(false);
    const handleClickLike = async (event) => {
        event.preventDefault();
        if (isLikeLoading) return;
        if (!userInfo.isLogin) {
            alert("로그인 후에 이용하실 수 있습니다.");
            return;
        }

        setLikeLoading(true);

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

        setLikeLoading(false);
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


    // 댓글 수정 기능
    const [modifyMode, setMode] = useState(false);
    const [content, setContent] = useState(comment.content);
    const [modifyLoading, setModifyLoading] = useState(false);
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (modifyLoading) return;

        setModifyLoading(true);
        if (content.length !== 0) {
            await modifyRequest(`api/comments/${comment.comment_id}`, { comment_id: comment.comment_id, content: content });
        }
        setModifyLoading(false);
        setMode(false);
    };


    // 댓글 삭제
    const [deleteLoading, setDeleteLoading] = useState(false)
    const handleDeleteBtn = async (event) => {
        event.preventDefault();
        if (deleteLoading) return;

        setDeleteLoading(true);
        if (window.confirm("삭제하시겠습니까?")) {
            await deleteRequest(`api/comments/${comment.comment_id}`, comment.comment_id);
        }
        setDeleteLoading(false);
    }

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
                            disabled={modifyLoading}
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
                            disabled={modifyLoading}
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
                                disabled={deleteLoading}
                            >
                                수정
                            </Button>
                            <Button
                                m={{ l: "0.3rem" }}
                                p={{ x: "0.8rem" }}
                                h="1.8rem"
                                bg="info700"
                                hoverBg="info800"
                                onClick={handleDeleteBtn}
                                disabled={deleteLoading}
                            >
                                삭제
                            </Button>
                        </> : <></>
                    }
                    <Button
                        m={{ l: "0.3rem" }}
                        p={{ l: "0.6rem", r:"0.8rem" }}
                        h="1.8rem"
                        bg={isLike ? "danger700" : "info700"}
                        hoverBg={isLike ? "danger700" : "info800"}
                        onClick={handleClickLike}
                        disabled={deleteLoading}
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

export default Comment;