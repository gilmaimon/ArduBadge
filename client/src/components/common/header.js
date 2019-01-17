import React from 'react';
import './header.css'
import { Link } from "react-router-dom";

function Header (props) {
    if(props.secondary) {
        return (
            <div className="appHeader">
                <Link to="/" className="appTitle">
                <span>{props.primary}</span>
                <span className="appSubtitle">{props.secondary}</span>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="appHeader">
                <Link to="/" className="appTitle">
                    <span>{props.primary}</span>
                </Link>
            </div>
        );
    }
    
}

export default Header;