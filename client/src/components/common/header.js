import React from 'react';
import './header.css'
import { Link } from "react-router-dom";

function Header (props) {
    if(props.secondary) {
        return (
            <div className="appHeader">
                <Link to="/" className="titleSubtitleContainer">
                    <span className="appTitle">{props.primary}</span>
                    <div className="subtitleWrapper">
                        <span className="appSubtitle">{props.secondary}</span>
                    </div>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="appHeader">
                <Link to="/" className="singleTitleSubtitleContainer">
                    <span className="appTitle">{props.primary}</span>
                </Link>
            </div>
        );
    }
    
}

export default Header;