import React, { Component } from 'react';
import './recently.css'

class RecentlyStartedWatching extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        fetch("/stats/recent")
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <div>
                Empty For Now
            </div>
        )
    }
}

export default RecentlyStartedWatching;