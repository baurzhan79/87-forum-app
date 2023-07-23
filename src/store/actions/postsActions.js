import axios from "../../axios-instance";
import { POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR, GET_POST_SUCCESS } from "../actionTypes";

export const postsRequest = () => (
    { type: POSTS_REQUEST }
);

export const postsSuccess = responseItems => (
    { type: POSTS_SUCCESS, responseItems }
);

export const postsError = (error) => (
    { type: POSTS_ERROR, error }
);

export const getPostSuccess = responseItem => (
    { type: GET_POST_SUCCESS, responseItem }
);


export const postsGetItems = () => {
    return async dispatch => {
        dispatch(postsRequest());
        try {
            const response = await axios.get("/posts");
            const items = [];
            if (response.status === 200) { // OK
                if (response.data !== null) {
                    const arrayOfKeys = Object.keys(response.data);

                    arrayOfKeys.forEach(currentKey => {
                        items.push({
                            id: response.data[currentKey]._id,
                            title: response.data[currentKey].title,
                            image: response.data[currentKey].image,
                            datetime: response.data[currentKey].datetime,
                            authorName: response.data[currentKey].author.username
                        })
                    });
                }
            }
            dispatch(postsSuccess(items));
        } catch (error) {
            dispatch(postsError(error));
        }
    }
};

export const addNewPost = (post, userToken) => {
    return async dispatch => {
        dispatch(postsRequest());
        try {
            await axios.post("/posts", post, { headers: { Authorization: userToken } });
        } catch (error) {
            dispatch(postsError(error));
        }
    }
};

export const getPost = (id) => {
    return async dispatch => {
        dispatch(postsRequest());
        try {
            const response = await axios.get(`/posts/${id}`);
            if (response.status === 200) { // OK
                if (response.data !== null) {
                    const item = {
                        id: response.data._id,
                        title: response.data.title,
                        description: response.data.description,
                        image: response.data.image,
                        datetime: response.data.datetime,
                        authorName: response.data.author.username
                    }
                    dispatch(getPostSuccess(item));
                }
            }

        } catch (error) {
            dispatch(postsError(error));
        }
    }
};