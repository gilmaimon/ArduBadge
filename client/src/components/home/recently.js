import React, { Component } from 'react';
import './recently.css'

class Item extends Component {
    constructor(props) {
        super(props);

        this.mouseHover = this.mouseHover.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);

        this.state = {
            hovered: false
        };
    }

    mouseHover(e) {
        this.setState({hovered: true})
    }

    mouseLeave(e) {
        this.setState({hovered: false})
    }
    
    render() {
        return (
            <a 
            className="linkLibWrapper" 
            href={`/${this.props.library.name}`}
            onMouseEnter={this.mouseHover}
            onMouseLeave={this.mouseLeave}>
                <div className="libItemWrapper">
                    <div className={`leftColoredTag ${this.state.hovered? "longer": ""}`} />
                    <span className="spanLibName">
                        {this.props.library.name + ` ` + this.props.library.version}
                    </span>
                </div>
            </a>
    );
    }
}

function Header(props) {
    return (
        <h3>
            Recently Started Watching
        </h3>
    );
}

const RECENT_UPDATE_INTERVAL = 15 * 1000; //ms

class RecentlyStartedWatching extends Component {
    constructor(props) {
        super(props);

        this.state = {libraries: []}
        this.timerId = 0;
    }

    setupIntervalUpdates(interval) {
        this.updateRecentList();
        return setInterval(function() {
            this.updateRecentList();
        }.bind(this), interval);
    }

    updateRecentList() {
        fetch("/stats/recent")
            .then(response => response.json())
            .then(data => this.setState({libraries: data}));
    }

    componentDidMount() {
        // start interval updates
        this.timerId = this.setupIntervalUpdates(RECENT_UPDATE_INTERVAL);
    }

    componentWillUnmount() {
        // Stop the interval updates
        clearInterval(this.timerId);
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