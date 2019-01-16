import React, { Component } from 'react';
import './header.css'

function Header (props) {
    return (
        <div class="appHeader">
            <p class="appTitle">{props.title}</p>
        </div>
    );
}

export default Header;