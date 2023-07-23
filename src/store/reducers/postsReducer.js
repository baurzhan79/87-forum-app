import { POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR, GET_POST_SUCCESS } from "../actionTypes";

const initialState = {
    loading: false,
    error: null,
    posts: [],
    selectedPost: null
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_REQUEST:
            return { ...state, loading: true, selectedPost: null }

        case POSTS_SUCCESS:
            return { ...state, loading: false, posts: action.responseItems, error: null }

        case POSTS_ERROR:
            return { ...state, loading: false, error: action.error }

        case GET_POST_SUCCESS:
            return { ...state, loading: false, selectedPost: action.responseItem }

        default:
            return state;
    }
};

export default postsReducer;