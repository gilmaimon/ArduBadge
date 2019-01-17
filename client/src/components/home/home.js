import React, { Component } from 'react';
import AutosizeInput from 'react-input-autosize';

import './home.css'

import Header from '../common/header'
import Footer from '../common/footer'

import RecentlyStartedWatching from './recently'

class InteractiveBadgeInput extends Component {
    constructor(props) {
        super(props);

        const defaultName = "MyLibrary";
        this.domainHttpPrefix = "http://ardu-badge.xyz";
        this.onLibnameChange = this.onLibnameChange.bind(this);
        this.state = {
            libname: defaultName
        }
    }

    onLibnameChange(e) {
        this.setState({
            libname: e.target.value
        });
    }

    render() {
        return (
            <div>
                
                <div class="interactiveWrapper">
                    <a class="badgePrefix">{this.domainHttpPrefix}/badge/</a>
                    <AutosizeInput
                        style={{ fontSize: 18 }}
                        class="badgeInput" 
                        onChange={this.onLibnameChange} 
                        value={this.state.libname}/>
                    <a class="badgePostfix">.svg</a>
                    <a class="badgeWrapper" href={`/${this.state.libname}/ide`}>
                        <img class="badgeImg" src={`/badge/${this.state.libname}.svg`}/>
                    </a>
                </div>
                <h3>Use This Markdown</h3>
                <p class="markdownCode">
                    ![![arduino-library-badge]({this.domainHttpPrefix}/badge/{this.state.libname}.svg)]({this.domainHttpPrefix}/{this.state.libname})
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
                <Header title="ArduBadge"/>
                <div class="homeWrapper">
                <div class="leftContent">
                    <h2>What is ArduBadge?</h2>
                    <p>Arduino Library Manger Badge (or <span class="homeSpan">ArduBadge</span>) is a way to help new and experienced
                        users to get a quick overview and installation guide for community-contributed <span class="homeSpan">Arduino</span> libraries.
                    </p>
                    <p>
                        With <span class="homeSpan">ArduBadge</span> you get a custom and dynamic markdown (GitHub) 
                        badge that elegently shows users that your library is available 
                        via the built in <span class="homeSpan">Library Manager</span>. In one click they can view 
                        instruction to help them trough the installtion proccess.
                    </p>
                    <a href="/MySensors/ide">
                        <h3>Click Here to see an example!</h3>
                    </a>
                    <br/>
                    <div>
                        <h2>Go Badge Yourself</h2>
                        <p>You have created an Arduino Library? <span class="homeSpan">ArduBadge</span> is completly free
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
                <div class="rightContent">
                    <p>
                        This is nothing important this is just here to 
                        take some room on the right side.
                        <RecentlyStartedWatching />
                    </p>
                </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;