import React, { Component } from 'react';
import './recently.css'

function Item(props) {
    return (
        <a className="linkLibWrapper" href={props.library.website}>
            <div className="libItemWrapper">
                <div className="leftColoredTag" />
                <span className="spanLibName">{props.library.name}</span>
                <span>-</span>
                <span className="spanVersion">{props.library.version}</span>
            </div>
        </a>
    );
}

function Header(props) {
    return (
        <h3>
            Recently Started Watching
        </h3>
    );
}

class RecentlyStartedWatching extends Component {
    constructor(props) {
        super(props);

        this.state = {libraries: []}
    }

    componentDidMount() {
        fetch("/stats/recent")
            .then(response => response.json())
            .then(data => this.setState({libraries: data}));
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.libraries.map((library)=> <Item library={library}/>)}
            </div>
        )
    }
}

export default RecentlyStartedWatching;