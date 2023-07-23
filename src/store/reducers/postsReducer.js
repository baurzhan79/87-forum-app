import { POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR } from "../actionTypes";

const initialState = {
    loading: false,
    error: null,
    posts: []
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_REQUEST:
            return { ...state, loading: true }

        case POSTS_SUCCESS:
            return { ...state, loading: false, posts: action.responseItems, error: null }

        case POSTS_ERROR:
            return { ...state, loading: false, error: action.error }

        default:
            return state;
    }
};

export default postsReducer;