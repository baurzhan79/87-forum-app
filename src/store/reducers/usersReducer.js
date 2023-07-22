import {
    REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, REGISTER_USER_REQUEST, REGISTER_USER_INIT,
    LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGIN_USER_REQUEST, LOGIN_USER_INIT,
    LOGOUT_USER
} from "../actionTypes";

const initialState = {
    loading: false,
    registerError: null,
    registeredUser: null,
    loginError: null,
    user: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_INIT:
            return initialState;

        case REGISTER_USER_REQUEST:
            return { ...state, loading: true };

        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false, registeredUser: action.user, registerError: null };

        case REGISTER_USER_FAILURE:
            return { ...state, loading: false, registerError: action.error };

        case LOGIN_USER_INIT:
            return initialState;

        case LOGIN_USER_REQUEST:
            return { ...state, loading: true };

        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.user, loginError: null };

        case LOGIN_USER_FAILURE:
            return { ...state, loading: false, loginError: action.error };

        case LOGOUT_USER:
            return { ...state, user: null };

        default:
            return state;
    }
};

export default usersReducer;