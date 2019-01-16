import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';

import './home.css'

import Header from '../common/header'
import Footer from '../common/footer'

class InteractiveBadgeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <span>http://localhost/badge/</span>
                <input></input>
                <span>.svg</span>
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
                <div class="content homeWrapper">
                    <InteractiveBadgeInput />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;