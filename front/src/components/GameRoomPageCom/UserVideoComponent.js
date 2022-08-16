import React, { useState } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";
import styled from 'styled-components';
import "../../CSS/UserVideoComponent.css"

export default function UserVideoComponent(props) {
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(false);

  const toggleAudio = () => {
      setAudio(!audio);
      props.streamManager.publishAudio(!audio);
  };
  
  const toggleVideo = () => {
      setVideo(!video);
      props.streamManager.publishVideo(!video);
  };

  const getNickname = () => {
      return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };
//   if (props.isPointer) {
    
// // const PointerScreen = styled.div`
// // position: absolute;
// // top: 0px;
// // width: 320px;
// // height: 200px;
// // border-radius: 12px;
// // display: flex;
// // flex-direction: column;
// // justify-content: space-between;

// // &:hover {
// //   background-color: #00000060;
// // }
// // `
//     Screen = PointerScreen;
//   } else {
//     Screen = defaultScreen;
//   }
  return (
    <div>
      {props.streamManager !== undefined ? (
        <Video style={props.isPointer ? {cursor: "pointer"} : {cursor: "default"}}>
          { props.isDead ? <p style={{ color: "#ffffff", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              사망</p> : <OpenViduVideoComponent streamManager={props.streamManager} /> }
          <Screen id={ props.isPointer ? "clickBox" : ""}>
            <Header>
              <NameTag>
                {getNickname()}
              </NameTag>
            </Header>
            { props.self ?
            <Footer>
              <VideoIcon onClick={toggleVideo}>
                <img
                    src={ video ? "video-solid.svg" : "video-slash-solid.svg" }
                    id={ video ? "video-active" : "video" }
                ></img>
              </VideoIcon>
              <MicrophoneIcon onClick={toggleAudio}>
                <img
                    src={ audio ? "microphone-solid.svg" : "microphone-slash-solid.svg" }
                    id={ audio ? "microphone-active" : "microphone" }
                ></img>
              </MicrophoneIcon>
            </Footer> : null }
          </Screen>
        </Video>
      ) : null}
    </div>
  );
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
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const VideoIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ccc;
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
  background-color: #ccc;
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
  background-color: #ccc;
  border-radius: 10px 6px 6px 6px;
  padding: 2px 10px;
  font-size: 14px;
`