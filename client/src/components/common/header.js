import React, { Component } from 'react';
import './header.css'
import { BrowserRouter as NavLink, Link} from "react-router-dom";

function Header (props) {
    return (
        <div class="appHeader">
            <Link to="/" class="appTitle">
                <div>{props.title}</div>
            </Link>
        </div>
    );
}

export default Header;