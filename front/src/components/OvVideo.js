import React, { Component } from 'react';
import styled from 'styled-components';


export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return (
            <Video>
                <video autoPlay={true} ref={this.videoRef} />
            </Video>
        );
    }
}

const Video = styled.div`
    width: 320px;
    height: 200px;
    background-color: var(--color-5);
    border-radius: 12px;
    position: relative;

    video {
        width: 320px;
        height: 200px;
        border-radius: 12px;
    }
`