import React from 'react';
import './header.css'
import { BrowserRouter as Link} from "react-router-dom";

function Header (props) {
    return (
        <div className="appHeader">
            <Link to="/" className="appTitle">
                <span className="appTitle">{props.title}</span>
            </Link>
        </div>
    );
}

export default Header;