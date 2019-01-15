import React, { Component } from 'react';
import './explenation.css'
import { BrowserRouter as BrowserRouter, Router, Route, Link } from "react-router-dom";

function IdePhrase(props) {
    return <span class="phrase">{props.body}</span>;
}

function ActionPhrase(props) {
    return <span class="phrase">{props.body}</span>;
}

function LibraryManagerExplanation(props) {
    let libName = <span class="libname">{props.libName}</span>
    return (
        <div class="explContainer">
            <div class="content">
                <h2>How to Install {libName}</h2>
                <div class="optionsContainer">
                    <Link to={`/${props.libName}/ide`} class="option active">Using the Library Manager</Link>
                    <Link to={`/${props.libName}/zip`} class="option">From a ZIP File</Link>
                </div>
            </div>
            <div class="content how-to-install">
                <p>To install {libName} into your <IdePhrase body="Arduino IDE" /> you can use  
                    the <IdePhrase body="Library Manager"/> (available from IDE version 1.6.2). Open the 
                    IDE and click to the <ActionPhrase body="Sketch" /> menu and  
                    then <ActionPhrase body="Include Library > Manage Libraries." /></p>

                <img src="/manage_libs.png"/>
                <p>Then the Library Manager will open and you will find a list of libraries 
                    that are already installed or ready for installation. In order to 
                    install {libName}, search for "{libName}", 
                    scroll the list to find it and <ActionPhrase body="click on it"/>.</p>
                
                <img src="/libs_manager.png"/>
                <p>Finally click on <ActionPhrase body="install"/> and wait for the IDE to install {libName}. 
                    Downloading may take time depending on your connection speed. Once it 
                    has finished, an Installed tag should appear next to the {libName} library. 
                    You can close the <IdePhrase body="Library Manager"/>.</p>            
                <p>You can now find {libName} available in the <ActionPhrase body="Sketch > Include Library" /> menu.</p>
            </div>
        </div>
      );

}

function ZipExplanation(props) {
    let libName = <span class="libname">{props.libName}</span>
    return (
        <div class="explContainer">
            <div class="content">
                <h2>How to Install {libName}</h2>
                <div class="optionsContainer">
                    <Link to={`/${props.libName}/ide`} class="option">Using the Library Manager</Link>
                    <Link to={`/${props.libName}/zip`} class="option active">From a ZIP File</Link>
                </div>
            </div>
            <div class="content how-to-install">
                <p>{libName} can also be installed as a <IdePhrase body="ZIP" /> file. Inside the zip will 
                    be <IdePhrase body=".cpp" /> files, <IdePhrase body="header" /> files and other files required by the library. 
                    Do not unzip the downloaded library, leave it as is.</p> 
                <p>In the <IdePhrase body="Arduino IDE" />, navigate to <ActionPhrase body="Sketch > Include Library > Add .ZIP Library" />
                    . At the top of the drop down list, select the 
                     option to <ActionPhrase body="Add .ZIP Library"/>.</p>
                <img src="/add_zip.png"/>
                <p>You will be prompted to select the {libName} <IdePhrase body="ZIP" />-file. <ActionPhrase body="Navigate" /> to 
                    the downloaded {libName} .zip file location and <ActionPhrase body="open" /> it.</p>
                <img src="/choose_zip.png"/>
                <p>Return to the <ActionPhrase body="Sketch > Include Library" /> menu. You should now 
                    see {libName} at the bottom of the drop-down menu. It is 
                    ready to be used in your sketch. </p>
            </div>
        </div>
    );
}

function Explanation (props) {
    let libName = props.libName;
    return (
        <div class="explContainer">
            <div class="content what-are-libs">
                <h2>What are Libraries?</h2>
                <p>Libraries are a collection of code that makes it easy for you to 
                    connect to a sensor, display, module, etc. For example, the built-in
                    LiquidCrystal library makes it easy to talk to character LCD
                    displays. There are hundreds of additional libraries available 
                    on the Internet for download. The built-in libraries and some of 
                    these additional libraries are listed in the reference. To use the 
                    additional libraries, you will need to install them.</p>
            </div>
            <Route path="/:libname/ide" component={() => <LibraryManagerExplanation libName={libName}/>} />
            <Route path="/:libname/zip" component={() => <ZipExplanation libName={libName}/>}  />
        </div>
      );

}

export default Explanation;