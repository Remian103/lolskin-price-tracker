import React, { useState, useEffect } from "react";
import { Div, Icon, Button } from "atomize";
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


    return (
        <Div
            className="comment-animation shadowDiv"
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
            <Button
                pos="relative"
                right="0"
                onClick={()=>{modifyRequest("", {comment_id : comment.comment_id, content :"modify Test"})}}
            >
                수정
            </Button>
        </Div>
    );
}

export default DummyComment;