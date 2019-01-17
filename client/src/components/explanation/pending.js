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
            <div className="pendingWrapper">
                <div className="pendingExplain">
                    <h1 className="pendingTitle">We are collecting data on <span className="libnameSpan">"{this.props.libName}"</span></h1>
                    <div className="spinnerWrapper">
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