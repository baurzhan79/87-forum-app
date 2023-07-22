import React from "react";
import { NavLink } from "react-router-dom";
import "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = ({ user }) => (
    <header className="Toolbar">
        <div className="Toolbar-logo">
            <NavLink className="Toolbar-navLink" to="/">
                Forum
            </NavLink>
        </div>
        <nav>
            <NavigationItems user={user} />
        </nav>
    </header>
);

export default Toolbar;