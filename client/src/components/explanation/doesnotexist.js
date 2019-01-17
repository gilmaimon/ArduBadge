import React from 'react';
import './doesnotexist.css'
import { BrowserRouter as NavLink } from "react-router-dom";

function DoesNotExist (props) {
    return (
        <div className="main">
            <br/>
            <h2>Whoops.</h2>
            <p>
                We could not find an Arduino Library 
                called <span className="libname">{props.libName}</span> on the Arduino Library Manager.
            </p>
            <p>
                There might be a typo in the library name or the library
                might not be published yet. If you want to add your own library 
                to Library Manager, follow <a href="https://github.com/arduino/Arduino/wiki/Library-Manager-FAQ#how-can-i-add-my-library-to-library-manager">these instructions</a>
            </p>

            <NavLink to="/">
                <h3>
                    Go Home
                </h3>
            </NavLink>
        </div>
    );
}

export default DoesNotExist;