import axios from "../../axios-instance";
import { POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR } from "../actionTypes";

export const postsRequest = () => (
    { type: POSTS_REQUEST }
);

export const postsSuccess = responseItems => (
    { type: POSTS_SUCCESS, responseItems }
);

export const postsError = (error) => (
    { type: POSTS_ERROR, error }
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