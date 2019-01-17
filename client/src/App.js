import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
                    <Route path="/:libname" component={libPage} />
                    <Route path="/" component={Home} />
                </Switch>
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
        let libraryExists = this.state.found;
        if(libraryExists === true) {
            return (
                <div>
                    <Header primary="ArduBadge" secondary={this.state.data.name} />
                    <Explanation library={this.state.data}/>
                    <Footer />
                </div>
            );
        } else if(libraryExists === false) {
            return (
                <div>
                    <Header primary="ArduBadge"/>
                    <DoesNotExist libName={this.state.libname}/>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div>
                    <Header primary="ArduBadge"/>
                    <Pending libName={this.state.libname}/>
                    <Footer />
                </div>
            );
        }
    }
}


export default App;
