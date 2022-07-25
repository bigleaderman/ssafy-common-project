import React from 'react';
import styled from 'styled-components';
import '../style.js';
import '../color.css';

const UserVideo = (props) => {
  return (
    <Video>
        <VideoIcon>
            <img src="microphone-solid.svg"></img>
        </VideoIcon>
        <MicrophoneIcon>
        </MicrophoneIcon>
    </Video>
  );
};

const Video = styled.div`
    width: 320px;
    height: 200px;
    background-color: var(--color-5);
    border-radius: 12px;
`
const VideoIcon = styled.div`
    width: 40px;
    height: 40px;
    background-color: var(--color-2);
    border-radius: 50%;
    justify-content: center;
    align-items: center;
`
const MicrophoneIcon = styled.div`
    width: 40px;
    height: 40px;
    background-color: var(--color-2);
    border-radius: 50%;
    justify-content: center;
    align-items: center;

    img {
        width: 20px;
    }
`

export default UserVideo;
