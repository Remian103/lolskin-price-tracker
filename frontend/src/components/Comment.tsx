import * as React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { Button, Div, Icon, Input } from "atomize";
import axios from "axios";
import "../css/Comment.css";

import UserContext from "../context/UserContext";
import { CommentObj } from "../interfaces/Comment.interface";

interface Props {
    comment: CommentObj;
    modifyRequest: (url: string, body: { [key: string]: string | number }) => Promise<void>;
    deleteRequest: (url: string, commentId: number) => Promise<void>;
}

function Comment({ comment, modifyRequest, deleteRequest }: Props) {
    const { userInfo } = useContext(UserContext);
    const auth = comment.current_user_auth;

    // 좋아요 기능
    const [isLike, setIsLike] = useState(false);
    useEffect(() => {
        console.log(auth);
        if (auth) {
            setIsLike(auth.is_liked);
        }
    }, [auth]);
    const [likes, setLikes] = useState(comment.likes);
    const [isLikeLoading, setLikeLoading] = useState(false);
    const handleClickLike: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        if (isLikeLoading) return;
        if (!userInfo.isLogin) {
            alert("로그인 후에 이용하실 수 있습니다.");
            return;
        }

        setLikeLoading(true);

        try {
            const url = `/api/comments/${comment.id}/likes`;
            const config = { headers: { "Authorization": `Bearer ${userInfo.tokenId}` } };
            const response = isLike ? await axios.delete(url, config) : await axios.post(url, null, config);
            // expected response : (int)

            if (process.env.NODE_ENV !== "production") console.log(response);
            setIsLike((prev) => !prev);
            setLikes(response.data);
        }
        catch (error) {
            console.log(`error in comment_id:${comment.id}\n`, error);
            alert("요청이 실패하였습니다.");
        }

        setLikeLoading(false);
    };
    const likeString = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000.0).toFixed(1).toString() + "M"
        }
        else if (num >= 1000) {
            return (num / 1000.0).toFixed(1).toString() + "K"
        }
        return num.toString()
    }


    // 각종 웹 요청 시 로딩 확인
    const [loading, setLoading] = useState(false);


    // 댓글 수정 기능
    const [modifyMode, setMode] = useState(false);
    const [content, setContent] = useState(comment.content);
    const inputRef = useRef<null | HTMLInputElement>(null);
    useEffect(() => {
        if (modifyMode && inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [modifyMode]);
    const handleModifyBtn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setContent(comment.content);
        setMode(true);
    };
    const handleModifyCancelBtn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setMode(false);
    }
    const handleConentChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setContent(event.target.value);
    };
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        if (loading) return;

        setLoading(true);
        if (content.length !== 0 && content !== comment.content) {
            await modifyRequest(`/api/comments/${comment.id}`, { content: content });
        }
        setLoading(false);
        setMode(false);
    };


    // 댓글 삭제
    const handleDeleteBtn: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        if (loading) return;

        setLoading(true);
        if (window.confirm("삭제하시겠습니까?")) {
            try {
                await deleteRequest(`/api/comments/${comment.id}`, comment.id);
            }
            catch (error) {
                setLoading(false);
            }
        }
        else {
            setLoading(false);
        }
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
                            hoverBg={loading ? "disabled" : "info800"}
                            disabled={loading}
                        >
                            수정
                        </Button>
                        <Button
                            m={{ l: "0.3rem" }}
                            p={{ x: "0.8rem" }}
                            h="1.8rem"
                            bg="info700"
                            hoverBg={loading ? "disabled" : "info800"}
                            onClick={handleModifyCancelBtn}
                            disabled={loading}
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
                    {auth && auth.is_modifiable ?
                        <>
                            <Button
                                m={{ l: "0.3rem" }}
                                p={{ x: "0.8rem" }}
                                h="1.8rem"
                                bg="info700"
                                hoverBg={loading ? "disabled" : "info800"}
                                onClick={handleModifyBtn}
                                disabled={loading}
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
                                disabled={loading}
                            >
                                삭제
                            </Button>
                        </> : <></>
                    }
                    <Button
                        m={{ l: "0.3rem" }}
                        p={{ l: "0.6rem", r: "0.8rem" }}
                        h="1.8rem"
                        bg={isLike ? "#ED1F24" : "info700"}
                        onClick={handleClickLike}
                        disabled={loading}
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