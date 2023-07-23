import { COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_ERROR } from "../actionTypes";

const initialState = {
    loading: false,
    error: null,
    comments: []
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMENTS_REQUEST:
            return { ...state, loading: true };

        case COMMENTS_SUCCESS:
            return { ...state, loading: false, comments: action.responseItems };

        case COMMENTS_ERROR:
            return { ...state, loading: false, error: action.error };

        default:
            return state;
    }
};

export default commentsReducer;