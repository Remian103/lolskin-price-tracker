import React, { useState, useEffect, useContext } from "react";
import { Input, Icon, Button } from "atomize";
import axios from "axios";

import Comment from "../components/Comment";
import useDataFetch from "../hooks/useDataFetch";
import UserContext from "../context/UserContext";

function urlWithParams(url, params) {
    let paramStr = "?";
    for (const param in params) {
        paramStr += param + "=" + params[param] + "&";
    }
    return url + paramStr.slice(0, paramStr.length - 1);
}

function CommentList({ skinId }) {
    const { userInfo } = useContext(UserContext);


    const [commentList, setCommentList] = useState([]);
    // get comment list
    const [startIndex, setStartIndex] = useState(0);
    const [{ isError, data }, doFetch, setConfig] = useDataFetch(
        urlWithParams(`/api/skins/${skinId}/comments`, {
            skip: startIndex,
            limit: startIndex + 20,
            order_by: "asc"
        }),
        { comments: [], start_index: 0, last_index: 0 }
    );
    // add id token to header
    useEffect(() => {
        if (userInfo.isLogin) {
            setConfig({ headers: { Authorization: `Bearer ${userInfo.tokenId}` } });
        }
    }, [userInfo, setConfig]);
    // update comment list
    useEffect(() => {
        if (data.start_index !== 0) {
            setCommentList(prevList => [
                ...prevList,
                ...data.comments
            ]);
        }
        else {
            setCommentList(data.comments);
        }
        setStartIndex(data.last_index);
    }, [data]);


    const modifyCommentList = (comment) => {
        const index = commentList.findIndex(e => e.comment_id === comment.comment_id);
        if (index !== -1) { // modify
            let nextList = [...commentList];
            nextList[index] = comment;
            setCommentList(nextList);
        }
        else { // new comment
            setCommentList((prevList) => [
                comment,
                ...prevList
            ]);
        }
    };
    const newCommentPost = async (url, body) => {
        try {
            const res = await axios.post(url, body, {
                headers: { Authorization: `Bearer ${userInfo.tokenId}` }
            });
            modifyCommentList(res.data);
        }
        catch (error) {
            console.log(error);
        }
        setSubmitLoading(false);
    };
    const modifyCommentPut = async (url, body) => {
        try {
            const res = await axios.put(url, body, {
                headers: { Authorization: `Bearer ${userInfo.tokenId}` }
            });
            modifyCommentList(res.data);
            alert("수정되었습니다.");
        }
        catch (error) {
            console.log(error);
            alert("수정 중 오류가 발생했습니다.");
        }
    };


    // form state
    const [comment, setComment] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        if (userInfo.isLogin) {
            if (comment !== "") {
                setSubmitLoading(true);
                newCommentPost(`/api/skins/${skinId}/comments`, { content: comment });
                setComment("");
            }
            else {
                alert("내용이 없습니다.");
            }
        }
        else {
            alert("로그인 후에 이용하실 수 있습니다.");
        }

    };

    return (<>
        <form
            style={{
                marginBottom: "0.5rem"
            }}
            onSubmit={handleSubmit}
        >
            <Input className="shadowDiv"
                type="text"
                value={comment}
                onChange={handleCommentChange}
                placeholder="comment here!"
                p={{ l: "1rem", r: "6rem" }}
                suffix={
                    <Button
                        pos="absolute"
                        disabled={submitLoading}
                        type="submit"
                        bg="info700"
                        hoverBg="info800"
                        top="0"
                        right="0"
                        rounded={{ r: "md" }}
                    >
                        {submitLoading ? <Icon name="Loading" size="18px" color="white" /> : "작성"}
                    </Button>
                }
            />
        </form>

        {isError ? <></> :
            commentList.map(comment =>
                <Comment key={comment.comment_id} comment={comment} modifyRequest={modifyCommentPut} />
            )
        }
    </>);
}

export default CommentList;