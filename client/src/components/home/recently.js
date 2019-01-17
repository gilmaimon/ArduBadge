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

class RecentlyStartedWatching extends Component {
    constructor(props) {
        super(props);

        this.state = {libraries: []}
    }

    componentDidMount() {
        fetch("/stats/recent")
            .then(response => response.json())
            .then(data => this.setState({libraries: data}));

        setInterval(function() {
            console.log("Fetching recent");
            fetch("/stats/recent")
            .then(response => response.json())
            .then(data => this.setState({libraries: data}));
        }.bind(this), 10 * 1000);
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