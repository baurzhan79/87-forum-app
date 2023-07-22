import { applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./reducers/usersReducer";

import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage";

const rootReducer = combineReducers({
    users: usersReducer
});

const persistedState = loadFromLocalStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState
}, enhancers)

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    });
});

export default store;