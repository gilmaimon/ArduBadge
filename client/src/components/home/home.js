import React, { Component } from 'react';
import AutosizeInput from 'react-input-autosize';

import './home.css'

import Header from '../common/header'
import Footer from '../common/footer'

import RecentlyStartedWatching from './recently'

const HTTP_DOMAIN_PREFIX = "https://www.ardu-badge.com";

class InteractiveBadgeInput extends Component {
    constructor(props) {
        super(props);

        const defaultName = "MyLibrary";
        this.onLibnameChange = this.onLibnameChange.bind(this);
        this.state = {
            libname: defaultName
        }
    }

    onLibnameChange(e) {
        if(e.target.value.length === 0) return;
        this.setState({
            libname: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="interactiveWrapper">
                    <span className="badgePrefix">{HTTP_DOMAIN_PREFIX}/badge/</span>
                    <AutosizeInput
                        style={{ fontSize: 18 }}
                        class="badgeInput" 
                        onChange={this.onLibnameChange} 
                        value={this.state.libname}/>
                    <span className="badgePostfix">.svg</span>
                    <a className="badgeWrapper" href={`/${this.state.libname}/ide`}>
                        <img alt="markdown badge" className="badgeImg" src={`/badge/${this.state.libname}.svg`}/>
                    </a>
                </div>
                <h4>Use This Markdown</h4>
                <p className="markdownCode">
                    [![arduino-library-badge]({HTTP_DOMAIN_PREFIX}/badge/{this.state.libname}.svg)]({HTTP_DOMAIN_PREFIX}/{this.state.libname})
                </p>
            </div>
        );
    }
}



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div>
                <Header primary="ArduBadge"/>
                <div className="main homeWrapper">
                <div className="leftContent">
                    <h2>What is ArduBadge?</h2>
                    <p>Arduino Library Manger Badge (or <span className="homeSpan">ArduBadge</span>) is a way to help new and experienced
                        users to get a quick overview and installation guide for community-contributed <span className="homeSpan">Arduino</span> libraries.
                    </p>
                    <p>
                        With <span className="homeSpan">ArduBadge</span> you get a custom and dynamic markdown (GitHub) 
                        badge that elegently shows users that your library is available 
                        via the built in <span className="homeSpan">Library Manager</span>. In one click they can view 
                        instruction to help them trough the installtion proccess.
                    </p>
                    <a className="aLink" href="/MySensors/ide">
                        <h3>Click Here to see an example!</h3>
                    </a>
                    <br/>
                    <div>
                        <h2>Go Badge Yourself</h2>
                        <p>You have created an Arduino Library? <span className="homeSpan">ArduBadge</span> is completly free
                            and it is really easy to get your own custom badge.
                            Type your library name below and copy the badge markdown 
                            to your README.md or website.
                        </p>
                        <p>
                            Clicking on the badge will get you to your own custom installation guide!
                        </p>
                        <InteractiveBadgeInput />
                    </div>
                </div>
                <div className="rightContent">
                    <RecentlyStartedWatching />
                    <br/>
                    <h3> View on Github </h3>
                    <div className="githubLogoWrapper">    
                        <a className="githubLink" href="https://github.com/gilmaimon/Arduino-Library-Manager-Badge">
                            <img className="githubLogo" alt="Github Logo" src="/github_logo.png" />
                        </a>
                    </div>
                </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;
