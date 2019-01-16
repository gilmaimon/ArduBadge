import React, { Component } from 'react';
import './doesnotexist.css'

function DoesNotExist (props) {
    return (
        <div class="content">
            <br/>
            <h2>Whoops.</h2>
            <p>
                We could not find an Arduino Library 
                called {props.libName} on the Arduino Library Manager.
            </p>
            <p>
                There might be a typo in the library name or the library
                might not be pulished yet. If you want to add your own library 
                to Library Manager, follow <a href="https://github.com/arduino/Arduino/wiki/Library-Manager-FAQ#how-can-i-add-my-library-to-library-manager">these instructions</a>
            </p>
        </div>
    );
}

export default DoesNotExist;