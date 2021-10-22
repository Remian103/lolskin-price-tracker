import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Input, Icon, Button } from 'atomize';
import axios from 'axios';

import Comment from './Comment';
import useDataFetch from '../hooks/useDataFetch';
import UserContext from '../context/UserContext';
import { CommentObj, CommentListObj } from '../interfaces/Comment.interface';
import api from '../config.json';

function urlWithParams(url: string, params: { [key: string]: string | number }) {
    let paramStr = '?';
    for (const param in params) {
        if (Object.prototype.hasOwnProperty.call(params, param)) {
            paramStr += `${param}=${params[param]}&`;
        }
    }
    return url + paramStr.slice(0, paramStr.length - 1);
}

function CommentList({ skinId }: { skinId: string }) {
    const { userInfo } = useContext(UserContext);
    const [submitLoading, setSubmitLoading] = useState(false); // for submit button disable when processing

    const [curSkinId, setSkinId] = useState(skinId);
    const [commentList, setCommentList] = useState<CommentObj[]>([]);
    // get comment list
    const [nextIndex, setNextIndex] = useState(0);
    const [{ isError, data: fetchedData }, doFetch] = useDataFetch<CommentListObj>(
        urlWithParams(`${api.backendAPI}/api/skins/${skinId}/comments`, {
            skip: nextIndex,
            limit: nextIndex + 3,
            order_by: 'asc',
        }),
        { comments: [], skip: 0, limit: 0, num_comments: 0 },
    );
    // skinId 변경 시 업데이트
    useEffect(() => {
        if (skinId !== curSkinId) {
            setSkinId(skinId);
            setCommentList([]);
            doFetch(urlWithParams(`${api.backendAPI}/api/skins/${skinId}/comments`, {
                skip: 0,
                limit: 3,
                order_by: 'asc',
            }));
        }
    }, [skinId]);
    // 댓글 더보기 버튼
    const [isLoadingMore, SetLoadingMore] = useState(false);
    const handleMoreBtn: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        SetLoadingMore(true);
        doFetch(urlWithParams(`${api.backendAPI}/api/skins/${skinId}/comments`, {
            skip: nextIndex,
            limit: nextIndex + 20,
            order_by: 'asc',
        }));
    };
    // update comment list
    useEffect(() => {
        if (isError) {
            alert('불러오기를 실패하였습니다.');
        } else {
            setNextIndex(fetchedData.limit);

            if (fetchedData.skip !== 0) {
                setCommentList((prevList) => {
                    // prevent same keys in comment list
                    const idList = prevList.map((comment) => comment.id);
                    return ([
                        ...prevList,
                        ...fetchedData.comments.filter((comment: CommentObj) => !idList.includes(comment.id)),
                    ]);
                });
            } else {
                setCommentList(fetchedData.comments);
            }
        }
        SetLoadingMore(false);
    }, [isError, fetchedData]);

    // 댓글 리스트에 수정사항이 생겼을 경우
    const modifyCommentList = (comment: CommentObj) => {
        const index = commentList.findIndex((e) => e.id === comment.id);
        if (index !== -1) { // modify
            const nextList = [...commentList];
            nextList[index] = comment;
            setCommentList(nextList);
        } else { // new comment
            setCommentList((prevList) => [
                comment,
                ...prevList,
            ]);
        }
    };
    const newCommentPost = async (url: string, body: { [key: string]: string | number }) => {
        try {
            const res = await axios.post(url, body, { headers: { Authorization: `Bearer ${userInfo.tokenId}` } });
            modifyCommentList(res.data);
        } catch (error) {
            console.log(error);
            alert('댓글 작성에 실패하였습니다.');
        }
        setSubmitLoading(false);
    };
    const modifyCommentPut = async (url: string, body: { [key: string]: string | number }) => {
        try {
            const res = await axios.put(url, body, { headers: { Authorization: `Bearer ${userInfo.tokenId}` } });
            modifyCommentList(res.data);
            alert('수정되었습니다.');
        } catch (error) {
            console.log(error);
            alert('수정 중 오류가 발생했습니다.');
        }
    };
    const commentDelete = async (url: string, commentId: number) => {
        try {
            await axios.delete(url, { headers: { Authorization: `Bearer ${userInfo.tokenId}` } });

            const newList = [...commentList];
            newList.splice(commentList.findIndex((e) => e.id === commentId), 1);
            setCommentList(newList);

            alert('삭제되었습니다.');
        } catch (error) {
            console.log(error);
            alert('삭제 중 오류가 발생했습니다.');
            throw error;
        }
    };

    // form state
    const [content, setContent] = useState('');
    const handleCommentChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setContent(event.target.value);
    };
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        // validation
        if (!userInfo.isLogin) {
            alert('로그인 후에 이용하실 수 있습니다.');
            return;
        }
        if (content === '') {
            alert('내용이 없습니다.');
            return;
        }

        // post new comment
        setSubmitLoading(true);
        newCommentPost(`${api.backendAPI}/api/skins/${skinId}/comments`, { content });
        setContent('');
    };

    return (
        <>
            <form
                style={{ marginBottom: '0.5rem' }}
                onSubmit={handleSubmit}
            >
                <Input
                    className="shadowDiv"
                    type="text"
                    value={content}
                    onChange={handleCommentChange}
                    placeholder="댓글을 남겨주세요!"
                    p={{ l: '1rem', r: '6rem' }}
                    suffix={(
                        <Button
                            pos="absolute"
                            disabled={submitLoading}
                            type="submit"
                            bg="info700"
                            hoverBg="info800"
                            top="0"
                            right="0"
                            rounded={{ r: 'md' }}
                        >
                            {submitLoading ? <Icon name="Loading" size="18px" color="white" /> : '작성'}
                        </Button>
                    )}
                />
            </form>

            {isError ? <></>
                : commentList.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        modifyRequest={modifyCommentPut}
                        deleteRequest={commentDelete}
                    />
                ))}
            {fetchedData.num_comments <= nextIndex ? <></>
                : (
                    <Button
                        onClick={handleMoreBtn}
                        disabled={isLoadingMore}
                        w="100%"
                        bg="info700"
                        hoverBg={isLoadingMore ? 'disabled' : 'info800'}
                        prefix={(
                            <Icon
                                name={isLoadingMore ? 'Loading' : 'DownArrow'}
                                size="18px"
                                color="white"
                                m={{ r: '0.5rem' }}
                            />
                        )}
                    >
                        더보기
                    </Button>
                )}
        </>
    );
}

export default CommentList;
