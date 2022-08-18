import React, { useState } from "react";
import Bgm1 from "../Sound/Bgm1.mp3";
import { Howl, Howler } from "howler";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
const SoundManager = () => {
  const [temp, setTemp] = useState(true);

  const [sound, setSound] = useState(new Howl({ src: [Bgm1], loop: true, volume: 0.02 }));

  sound.once("load", function () {
    sound.play();
  });

  function stopMusic() {
    setTemp(false);
    setSound((prev) => prev.volume(0.0));
  }
  function playMusic() {
    setTemp(true);
    setSound((prev) => prev.volume(0.02));
  }

  return (
    <>
      {temp ? (
        <button
          style={{ position: "absolute", top: "5px", right: "40px", width: 20 }}
          onClick={stopMusic}
        >
          <VolumeUpIcon sx={{ fontSize: 40 }} />
        </button>
      ) : (
        <button
          style={{ position: "absolute", top: "5px", right: "40px", width: 20 }}
          onClick={playMusic}
        >
          <VolumeOffIcon sx={{ fontSize: 40 }} />
        </button>
      )}
    </>
  );
};

export default SoundManager;
