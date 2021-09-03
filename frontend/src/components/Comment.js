import React, { useState } from "react";
import { Div, Icon } from "atomize";
import axios from "axios";
import "../css/Comment.css";

function Comment({ skinId, commentId, comment, like, apiList }) {
    const [isLike, setIsLike] = useState(false);
    const [likeNum, setLikeNum] = useState(like);
    const [isLoading, setLoading] = useState(false);
    
    const handleClickLike = async (event) => {
        event.preventDefault();
        if (isLoading) return;
        
        setLoading(true);

        await axios.post(`/dummy/url`, {
            title: (isLike ? "Like" : "disLike"),
            body: {
                skin_id: skinId,
                comment_id: commentId
            }
        }).then((response) => {
            console.log(response);
            const {comment_id, like_num, success} = response.data;
            
            // dummy code! start 
            setIsLike((prev)=>!prev);
            if(isLike) setLikeNum((prev)=> prev-1);
            else setLikeNum((prev)=> prev+1);
            // dummy code! end
            
            if(success && comment_id === commentId) {
                setIsLike((prev)=>!prev);
                setLikeNum(like_num);
            }
        }).catch((error) => {
            console.log(`error in comment_id:${commentId}, skin_id:${skinId}\n`, error);
        });
        
        setLoading(false);
    };


    return (
        <Div
            className="comment shadowDiv"
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
                {likeNum}
                <Icon onClick={handleClickLike} name={isLike ? "HeartSolid" : "Heart"} size="20px" color="info700" />
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