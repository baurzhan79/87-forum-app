import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import Spinner from "../../components/UI/Spinner/Spinner";
import CommentsList from "../../components/CommentsList/CommentsList";
import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";

import { Container } from "react-bootstrap";

import { getPost } from "../../store/actions/postsActions";
import { commentsGetItems, addNewComment } from "../../store/actions/commentsActions";

const FullPost = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.postId !== undefined) dispatch(getPost(params.postId));
    }, [params.postId, dispatch])

    const post = useSelector(state => state.posts.selectedPost);
    const errorMsgPost = useSelector(state => state.posts.error);

    useEffect(() => {
        if (post !== null) dispatch(commentsGetItems(post.id));
    }, [post, dispatch])

    const { comments, loading } = useSelector(state => state.comments, shallowEqual);
    const errorMsgComments = useSelector(state => state.comments.error);

    useEffect(() => {
        if (errorMsgPost !== null) {
            console.log("Error with request: ", errorMsgPost);
            navigate("/");
        }
    }, [errorMsgPost, navigate]);

    useEffect(() => {
        if (errorMsgComments !== null) {
            console.log("Error with request: ", errorMsgComments);
            navigate("/");
        }
    }, [errorMsgComments, navigate]);

    const user = useSelector(state => state.users.user);

    useEffect(() => {
        if (user === null) navigate("/");
    }, [user, navigate]);

    const submitHandler = async comment => {
        await dispatch(addNewComment(comment, user.token));
        window.location.reload();
    };

    // =========================================================
    if (loading || post === null) return (<Spinner />);
    else {
        const postDateTime = new Date(post.datetime);

        return (
            <Container className="border border-primary mt-2">
                <h4 style={{ marginTop: "10px" }}>{post.title}</h4>
                <p style={{ opacity: "0.5" }}>created at {postDateTime.toLocaleDateString()} {postDateTime.toLocaleTimeString()} by {post.authorName}</p>
                <p style={{ marginTop: "10px" }}>
                    <span style={{ opacity: "0.5" }}>description: </span>
                    {post.description}
                </p>
                <CommentsList commentsList={comments} />
                <AddCommentForm onSubmit={submitHandler} postId={post.id} />
            </Container>
        )
    }
}

export default FullPost