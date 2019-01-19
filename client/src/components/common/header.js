import React from 'react';
import './header.css'

function Header (props) {
    if(props.secondary) {
        return (
            <div className="appHeader">
                <a href="/" className="titleSubtitleContainer">
                    <span className="appTitle">{props.primary}</span>
                    <div className="subtitleWrapper">
                        <span className="appSubtitle">{props.secondary}</span>
                    </div>
                </a>
            </div>
        );
    } else {
        return (
            <div className="appHeader">
                <a href="/" className="singleTitleSubtitleContainer">
                    <span className="appTitle">{props.primary}</span>
                </a>
            </div>
        );
    }
    
}

export default Header;