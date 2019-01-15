import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from './components/header'
import Explanation from './components/explenation'
import Footer from './components/footer'

class App extends Component {
    constructor(props) {
        super(props);

        this.onLibnameChange = this.onLibnameChange.bind(this);
        this.state = {
            width: '100%',
            badgeSrc: "http://arduino-library-badge.gilmaimon.xyz/badge/LibraryName.svg"
        };
    }

    onLibnameChange(event) {
        let newValue = event.target.value;
        let regex = /^http:\/\/arduino-library-badge\.gilmaimon\.xyz\/badge\/(.+)\.svg$/g;
        
        if(regex.test(newValue)) {
            this.setState({
                badgeSrc: newValue
            })
        }
        
    }

//<Input value={this.state.badgeSrc} width={this.state.width} onChange={this.onLibnameChange}></Input>
//<img src={this.state.badgeSrc} />
/*
<body>
                <div class="appHeader">
                    <p class="appTitle">ArduBadge</p>
                </div>
                <div class="contentContainer">
                    <div class="leftItem">aaa</div>
                    <div class="rightItem">bbb</div>
                </div>
            </body>
            */

    render() {
        return (
            <Router>
                <Route path="/:libname/:type" component={libPage} />
            </Router>
        );
    }
}

function libPage({match}) {
    return <LibPage name={match.params.libname}/>;
}

class LibPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            libname: props.name 
        };
    }

    componentDidMount() {
        fetch(`/library/${this.state.libname}`)
            .then(response => response.json())
            .then(json => this.setState(json) );
    }

    render() {
        console.log(this.state.found);
        return (
            <div>
                <Header />
                <div>Latest version is {this.state.found? this.state.data.version: "unknown"} </div>
                <Explanation libName={this.state.libname}/>
                <Footer />
            </div>
          );
    }
}


export default App;
