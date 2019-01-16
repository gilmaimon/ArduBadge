import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';

import './home.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div class="homeWrapper">
                Home
            </div>
        );
    }
}

export default Home;