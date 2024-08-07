import React from 'react';
import './explenation.css'
import { Route, Link, Switch } from "react-router-dom";
import urlencode from 'urlencode';

function IdePhrase(props) {
    return <span className="phrase">{props.body}</span>;
}

function ActionPhrase(props) {
    return <span className="phrase">{props.body}</span>;
}

function LibraryManagerExplanation(props) {
    let library = props.library;
    let version = library.version;
    let libName = <span className="libname">{library.name}</span>

    let pathPrefix = `/${library.name}`
    if(props.versioned) {
        pathPrefix += '/' + library.version;
    }

    return (
        <div>
            <div>
                <h2>How to Install {libName}</h2>
                <div className="optionsContainer">
                    <Link to={pathPrefix + '/ide'} className="option active">Using the Library Manager</Link>
                    <Link to={pathPrefix + '/zip'} className="option">From a ZIP File</Link>
                </div>
            </div>
            <div className="how-to-install">
                <p>To install {libName} into your <IdePhrase body="Arduino IDE" /> you can use  
                    the <IdePhrase body="Library Manager"/> (available from IDE version 1.6.2). Open the 
                    IDE and click to the <ActionPhrase body="Sketch" /> menu and  
                    then <ActionPhrase body="Include Library > Manage Libraries." /></p>

                <img alt="shows how to get to library manager" className="explanationImg" src="/static/manage_libs.png"/>
                <p>Then the Library Manager will open and you will find a list of libraries 
                    that are already installed or ready for installation. In order to 
                    install {libName}, search for "{libName}", 
                    scroll the list to find it and <ActionPhrase body="click on it"/>.</p>
                
                <img alt="shows how to get the library target version and install" className="explanationImg" src="/static/libs_manager.png"/>
                <p>You should see the target version of {libName} (version <IdePhrase body={version}/>) listed.</p>
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
    let library = props.library;
    let libName = <span className="libname">{library.name}</span>
    
    let pathPrefix = `/${library.name}`
    if(props.versioned) {
        pathPrefix += '/' + library.version;
    }

    return (
        <div>
            <div>
                <h2>How to Install {libName}</h2>
                <div className="optionsContainer">
                    <Link to={pathPrefix + '/ide'} className="option">Using the Library Manager</Link>
                    <Link to={pathPrefix + '/zip'} className="option active">From a ZIP File</Link>
                </div>
            </div>
            <div className="how-to-install">
                <p>{libName} can also be installed as a <IdePhrase body="ZIP" /> file. 
                The target version's (<IdePhrase body={library.version}/>) ZIP 
                file is available for <a href={library.url}><ActionPhrase body="Download Here"/></a>.
                </p>
                <p>Inside the zip will 
                    be <IdePhrase body=".cpp" /> files, <IdePhrase body="header" /> files and other files required by the library. 
                    Do not unzip the downloaded library, leave it as is.</p> 
                <p>In the <IdePhrase body="Arduino IDE" />, navigate to <ActionPhrase body="Sketch > Include Library > Add .ZIP Library" />
                    . At the top of the drop down list, select the 
                     option to <ActionPhrase body="Add .ZIP Library"/>.</p>
                <img alt="shows how to get to add ZIP window" className="explanationImg" src="/static/add_zip.png"/>
                <p>You will be prompted to select the {libName} <IdePhrase body="ZIP" />-file. <ActionPhrase body="Navigate" /> to 
                    the downloaded {libName} .zip file location and <ActionPhrase body="open" /> it.</p>
                <img alt="shows to select a zip file" className="explanationImg" src="/static/choose_zip.png"/>
                <p>Return to the <ActionPhrase body="Sketch > Include Library" /> menu. You should now 
                    see {libName} at the bottom of the drop-down menu. It is 
                    ready to be used in your sketch. </p>
            </div>
        </div>
    );
}

function Explanation (props) {
    let library = props.library;
    let libName = <span className="libname">{library.name}</span>

    let badgeUrl = `/badge/${library.name}.svg`
    if(props.version) {
        badgeUrl += `?version=${urlencode(props.version)}`
    }

    return (
        <div className="main">
            <div className="what-are-libs">
                <h2>What are Arduino Libraries?</h2>
                <p>Libraries are a collection of code that makes it easy for you to 
                    connect to a sensor, display, module, etc. For example, the library
                    LiquidCrystal library makes it easy to talk to character LCD
                    displays. There are many additional libraries available 
                    on the Internet for download. To use the 
                    additional libraries, you will need to install them.</p>
            </div>
            <div>
                <img alt="markdown library badge" className="badge" src={badgeUrl} />
                <h2>What is {libName}?</h2>
                <p>{library.sentence} {library.paragraph} </p>
                <p>Made by: <a className="aLink" href={library.repository}>{library.author}</a> </p>
                <p><a className="aLink" href={library.website}>Visit the official website.</a></p>
                <div>
            </div>
            <br/>
            </div>
            <Switch>
                <Route exact path="/:libname/zip" component={() => <ZipExplanation library={library}/>}  />
                <Route exact path="/:libname/ide" component={() => <LibraryManagerExplanation library={library}/>} />
                <Route exact path="/:libname/:version/zip" component={() => <ZipExplanation library={library} versioned={true}/>}  />
                <Route exact path="/:libname/:version/ide" component={() => <LibraryManagerExplanation library={library}  versioned={true}/>} />
                <Route exact path="/:libname/:version" component={() => <LibraryManagerExplanation library={library}  versioned={true}/>} />
                <Route exact path="/:libname/" component={() => <LibraryManagerExplanation library={library}/>} />
            </Switch>
            <div className="content">
                <p className="mini">
                    Credit: This text is heavly based on the <a className="aLink" href="https://www.arduino.cc/en/guide/libraries">official arduino guide</a>.
                    This text is licensed under a <a className="aLink" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 License. </a>
                </p>
            </div>
        </div>
      );

}

export default Explanation;