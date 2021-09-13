import React, { useState, useEffect, useContext, useRef } from "react";
import { Input, Icon, Button } from "atomize";
import axios from "axios";

import DummyComment from "../dummy/DummyComment";
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
    const [nextIndex, setNextIndex] = useState(0);
    const [{ isError, data : fetchedData }, doFetch, setConfig] = useDataFetch(
        urlWithParams(`/api/skins/${skinId}/comments`, {
            skip: nextIndex,
            limit: nextIndex + 20,
            order_by: "asc"
        }),
        { comments: [], start_index: 0, last_index: 0, num_comments: 0 }
    );
    // add id token to header
    useEffect(() => {
        if (userInfo.isLogin) {
            setConfig({ headers: { Authorization: `Bearer ${userInfo.tokenId}` } });
        }
    }, [userInfo, setConfig]);
    // 더보기
    const [isLoadingMore, SetLoadingMore] = useState(false);
    const handleMoreBtn = (e) => {
        e.preventDefault();
        SetLoadingMore(true);
        doFetch(urlWithParams(`/api/skins/${skinId}/comments`, {
            skip: nextIndex,
            limit: nextIndex + 20,
            order_by: "asc"
        }));
    };
    // update comment list
    useEffect(() => {
        setNextIndex(fetchedData.last_index);

        if (fetchedData.start_index !== 0) {
            setCommentList(prevList => [
                ...prevList,
                ...fetchedData.comments
            ]);
        }
        else {
            setCommentList(fetchedData.comments);
        }
        SetLoadingMore(false);
    }, [fetchedData]);

    // test dummy
    const totalDummyComments =[
        { comment_id: 0, content: "test comment!", like_state: false, likes: 38, is_modifiable: true },
        { comment_id: 1, content: "awesome skin!", like_state: false, likes: 37, is_modifiable: true },
        { comment_id: 2, content: "bads...", like_state: false, likes: 20000000, is_modifiable: false },
        { comment_id: 3, content: "like please!", like_state: false, likes: 351512341, is_modifiable: false },
        { comment_id: 4, content: "test comment!", like_state: false, likes: 16873, is_modifiable: true },
        { comment_id: 5, content: "test comment!", like_state: false, likes: 111, is_modifiable: false },
        { comment_id: 6, content: "test comment!", like_state: false, likes: 999, is_modifiable: false }
    ];
    const [dummyComments, setDummyComments] = useState([]);
    const [fakeData, setData] = useState({comments:[], start_index: 0, last_index: 0, num_comments: totalDummyComments});
    useEffect(()=> {
        setData({
            comments: totalDummyComments.slice(nextIndex, nextIndex+3),
            start_index: nextIndex,
            last_index: nextIndex+3 > totalDummyComments.length ? totalDummyComments.length : nextIndex+3,
            num_comments: totalDummyComments.length
        });
    }, []);
    useEffect(()=> {
        setNextIndex(fakeData.last_index);

        if (fakeData.start_index !== 0) {
            setDummyComments(prevList => [
                ...prevList,
                ...fakeData.comments
            ]);
        }
        else {
            setDummyComments(fakeData.comments);
        }
        SetLoadingMore(false);
    }, [fakeData]);
    const id = useRef(7);
    const newCommentPostDummy = (url, body) => {
        const comment = {
            comment_id: id.current,
            content: body.content,
            like_state: false,
            likes: 0,
            is_modifiable: true,
        }
        id.current += 1;
        const index = dummyComments.findIndex(e => e.comment_id === comment.comment_id);
        if (index !== -1) { // modify
            let nextList = [...dummyComments];
            nextList[index] = comment;
            setDummyComments(nextList);
        }
        else { // new comment
            setDummyComments((prevList) => [
                comment,
                ...prevList
            ]);
        }
        setSubmitLoading(false);
    }
    const modifyCommentDummy = (url, body) => {
        const index = dummyComments.findIndex(e => e.comment_id === body.comment_id);
        const comment = {
            comment_id: dummyComments[index].comment_id,
            content: body.content,
            like_state: dummyComments[index].like_state,
            likes: dummyComments[index].likes,
            is_modifiable: dummyComments[index].is_modifiable,
        }
        if (index !== -1) { // modify
            let nextList = [...dummyComments];
            nextList[index] = comment;
            setDummyComments(nextList);
        }
        else { // new comment
            setDummyComments((prevList) => [
                comment,
                ...prevList
            ]);
        }
    }
    const handleMoreBtnDummy = (e) => {
        SetLoadingMore(true);
        e.preventDefault();
        setData({
            comments: totalDummyComments.slice(nextIndex, nextIndex+3),
            start_index: nextIndex,
            last_index: nextIndex+3 > totalDummyComments.length ? totalDummyComments.length : nextIndex+3,
            num_comments: totalDummyComments.length
        })
    };
    useEffect(() => {
        return () => {
            console.log("comment list unmount");
        }
    }, []);
    // test dummy

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
                //newCommentPost(`/api/skins/${skinId}/comments`, { content: comment });
                newCommentPostDummy(`/api/skins/${skinId}/comments`, { content: comment }); // test dummy
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

        {dummyComments.map(comment => // test dummy
            <DummyComment key={comment.comment_id} comment={comment} modifyRequest={modifyCommentDummy}/>
        )}
        {fakeData.num_comments <= nextIndex ? <></> :
            <Button
                onClick={handleMoreBtnDummy}
                disabled={isLoadingMore}
                w="100%"
                bg="info700"
                hoverBg="info800"
                prefix={
                    <Icon
                        name={isLoadingMore ? "Loading" : "DownArrow"}
                        size="18px"
                        color="white"
                        m={{ r: "0.5rem" }}
                    />
                }
            >
                더보기
            </Button>
        }
    </>);
}

export default CommentList;