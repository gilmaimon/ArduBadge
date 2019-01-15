import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';

import './pending.css'

class Pending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div class="pendingWrapper">
                <div class="pendingExplain">
                    <h1 class="pendingTitle">We are collecting data on <span class="libnameSpan">"{this.props.libName}"</span></h1>
                    <div class="spinnerWrapper">
                        <BeatLoader
                            sizeUnit={"px"}
                            size={50}
                            color={'#00979D'}
                            loading={this.state.loading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Pending;