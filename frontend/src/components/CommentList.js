import React, { useState } from "react";
import { Input, Button } from "atomize";

import Comment from "../components/Comment";
//import useDataFetch from "../hooks/useDataFetch";

function CommentList({ skinId }) {
    //const [{ isLoading, isError, data: comments }, doFetch] = useDataFetch("initialUrl", []);
    /** /api/skins/:skinId/comments 에서 comment list가 넘어온다고 가정 */
    
    const dummyComments = [
        { id: 0, comment: "test comment!", likes: 38 },
        { id: 1, comment: "awesome skin!", likes: 37 },
        { id: 2, comment: "bads...", likes: 102 },
        { id: 3, comment: "like please!", likes: 33 },
        { id: 4, comment: "test comment!", likes: 2 },
        { id: 5, comment: "test comment!", likes: 10 },
        { id: 6, comment: "test comment!", likes: 0 },
        { id: 7, comment: `test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! test long comment! \
            test long comment! test long comment! test `, likes: 1 },
    ];

    // form state
    const [comment, setComment] = useState("");
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        if (comment !== "") {
            console.log("sample/url", { comment: comment });
            setComment("");
        }
        else {
            console.log("empty comment");
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
                        type="submit"
                        bg="info700"
                        hoverBg="info800"
                        top="0"
                        right="0"
                        rounded={{ r: "md" }}
                    >
                        Submit
                    </Button>
                }
            />
        </form>

        {dummyComments.map(element =>
            <Comment key={element.id} skinId={skinId} commentId={element.id} comment={element.comment} like={element.likes} />
        )}
    </>);
}

export default CommentList;