import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

import { logoutUser } from "../../../store/actions/usersActions";

const NavigationItems = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    if (user)
        return (
            <ul className="NavigationItems">
                <li className="NavigationItems-li">
                    <p>Hello, {user.username}</p>
                </li>
                <NavigationItem to="/add-post">Add new post</NavigationItem>
                <li className="NavigationItems-li">
                    <Button variant="outline-primary" onClick={logoutHandler}>Logout</Button>
                </li>
            </ul>
        );
    else
        return (
            <ul className="NavigationItems">
                <NavigationItem to="/register">Sign Up</NavigationItem>
                <NavigationItem to="/login">Sign In</NavigationItem>
            </ul>
        );
};

export default NavigationItems;