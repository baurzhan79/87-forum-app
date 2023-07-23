import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AddPostForm from "../../components/AddPostForm/AddPostForm";

import { addNewPost } from "../../store/actions/postsActions";

const AddPost = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);

    useEffect(() => {
        if (user === null) navigate("/");
    }, [user, navigate]);

    const submitHandler = async formData => {
        await dispatch(addNewPost(formData, user.token));
        navigate("/");
    };

    return (
        <AddPostForm onSubmit={submitHandler} />
    )
}

export default AddPost