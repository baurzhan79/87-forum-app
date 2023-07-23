import axios from "../../axios-instance";
import { COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_ERROR } from "../actionTypes";

export const commentsRequest = () => (
    { type: COMMENTS_REQUEST }
);

export const commentsSuccess = responseItems => (
    { type: COMMENTS_SUCCESS, responseItems }
);

export const commentsError = (error) => (
    { type: COMMENTS_ERROR, error }
);


export const commentsGetItems = (postId) => {
    return async dispatch => {
        dispatch(commentsRequest());
        try {
            const response = await axios.get(`/comments?postId=${postId}`);
            const items = [];
            if (response.status === 200) { // OK
                if (response.data !== null) {
                    const arrayOfKeys = Object.keys(response.data);

                    arrayOfKeys.forEach(currentKey => {
                        items.push({
                            id: response.data[currentKey]._id,
                            text: response.data[currentKey].text,
                            datetime: response.data[currentKey].datetime,
                            postId: response.data[currentKey].post._id,
                            authorName: response.data[currentKey].author.username
                        })
                    });
                }
            }

            dispatch(commentsSuccess(items));
        } catch (error) {
            dispatch(commentsError(error));
        }
    }
};

export const addNewComment = (comment, userToken) => {
    return async dispatch => {
        dispatch(commentsRequest());
        try {
            await axios.post("/comments", comment, { headers: { Authorization: userToken } });
        } catch (error) {
            dispatch(commentsError(error));
        }
    }
};