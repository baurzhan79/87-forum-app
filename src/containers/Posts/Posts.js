import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { postsGetItems } from "../../store/actions/postsActions";

import "./Posts.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import ItemsList from "../../components/ItemsList/ItemsList";

const Posts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { posts, loading } = useSelector(state => state.posts, shallowEqual);
    const errorMsg = useSelector(state => state.posts.error);

    useEffect(() => {
        dispatch(postsGetItems());
    }, [dispatch]);

    useEffect(() => {
        if (errorMsg !== null) console.log("Error with request: ", errorMsg);
    }, [errorMsg]);

    const openItemHandler = (item) => {
        navigate(`/posts/${item.id}`);
    }

    // =========================================================
    if (loading) return (<Spinner />);
    else
        return (
            <div className="Posts">
                <ItemsList
                    itemsList={posts}
                    onOpenItem={(item) => openItemHandler(item)}
                />
            </div>
        )
}

export default Posts