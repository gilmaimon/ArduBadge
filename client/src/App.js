import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import urlencode from 'urlencode'

import Header from './components/common/header'
import Footer from './components/common/footer'

import Explanation from './components/explanation/explenation'
import Pending from './components/explanation/pending'
import DoesNotExist from './components/explanation/doesnotexist'

import Home from './components/home/home'

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
    
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/:libname/:version/zip" component={libPage} />
                    <Route path="/:libname/:version/ide" component={libPage} />
                    <Route path="/:libname/ide" component={libPage} />
                    <Route path="/:libname/zip" component={libPage} />
                    <Route path="/:libname/:version" component={libPage} />
                    <Route path="/:libname" component={libPage} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}

function libPage({match}) {
    return <LibPage libname={match.params.libname} version={match.params.version}/>;
}

class LibPage extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        let apiUrl = `/library/${this.props.libname}`;
        if(this.props.version) {
            apiUrl += `?version=${urlencode(this.props.version)}`
        }
        fetch(apiUrl)
            .then(response => response.json())
            .then(json => this.setState(json) );
    }

    render() {
        let libraryExists = this.state.found;
        let primaryTitle = "ArduBadge";

        if(libraryExists === true) { // Show explenation
            return (
                <div>
                    <Header primary={primaryTitle} secondary={this.state.data.name} />
                    <Explanation library={this.state.data} version={this.props.version}/>
                    <Footer />
                </div>
            );
        } else if(libraryExists === false) { // Does Not Exist
            return (
                <div>
                    <Header primary={primaryTitle}/>
                    <DoesNotExist libName={this.props.libname} version={this.props.version}/>
                    <Footer />
                </div>
            );
        } else { //Loading Page
            return (
                <div>
                    <Header primary={primaryTitle}/>
                    <Pending libName={this.props.libname}/>
                    <Footer />
                </div>
            );
        }
    }
}


export default App;
