import React, { Component } from 'react';
import styled from 'styled-components';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.state = {
            muted: true,
            videoOff: true,
        };
        this.changeMuted = this.changeMuted.bind(this);
        this.changeVideoOff = this.changeVideoOff.bind(this);
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
  
    changeMuted() {
        this.setState({ muted: !this.state.muted });
    };
    
    changeVideoOff() {
        this.setState({ videoOff: !this.state.videoOff });
    };
    
    getNickname() {
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <Video>
                <video autoPlay={true} ref={this.videoRef} />
                <Screen>
                    <Header>
                        <NameTag>
                            {this.getNickname()}
                        </NameTag>
                    </Header>
                    <Footer>
                        <VideoIcon onClick={this.changeVideoOff}>
                            <img
                                src={ this.state.videoOff ? "video-slash-solid.svg" : "video-solid.svg"}
                                id={ this.state.videoOff ? "video" : "video-active"}
                            ></img>
                        </VideoIcon>
                        <MicrophoneIcon onClick={this.changeMuted}>
                            <img
                                src={ this.state.muted ? "microphone-slash-solid.svg" : "microphone-solid.svg"}
                                id={ this.state.muted ? "microphone" : "microphone-active"}
                            ></img>
                        </MicrophoneIcon>
                    </Footer>
                </Screen>
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

const Screen = styled.div`
    position: absolute;
    top: 0px;
    width: 320px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const VideoIcon = styled.div`
    width: 40px;
    height: 40px;
    background-color: var(--color-2);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
        height: 20px;
        user-select: none;
    }

    #video {
        filter: brightness(0) saturate(100%) invert(13%) sepia(36%) saturate(6892%) hue-rotate(356deg) brightness(102%) contrast(109%);
    }
`

const MicrophoneIcon = styled.div`
    width: 40px;
    height: 40px;
    background-color: var(--color-2);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 6px;

    img {
        height: 20px;
        user-select: none;
    }

    #microphone {
        filter: brightness(0) saturate(100%) invert(13%) sepia(36%) saturate(6892%) hue-rotate(356deg) brightness(102%) contrast(109%);
    }
`

const Footer = styled.div`
    display: flex;
    justify-content: end;
    align-items: end;
    padding: 10px;
`

const Header = styled.div`
    display: flex;
`

const NameTag = styled.div`
    background-color: var(--color-2);
    border-radius: 12px 6px 6px 6px;
    padding: 2px 10px;
    font-size: 14px;
`