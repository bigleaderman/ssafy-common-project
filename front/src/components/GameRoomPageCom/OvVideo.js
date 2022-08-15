import React, { useEffect, useRef } from "react";
import styled from 'styled-components';

export default function OpenViduVideoComponent(props) {
  const videoRef = useRef();

  useEffect(() => {
    if (props && !!videoRef) props.streamManager.addVideoElement(videoRef.current);
  });
  return (
    <Video>
      <video autoPlay={true} ref={videoRef} />
    </Video>
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