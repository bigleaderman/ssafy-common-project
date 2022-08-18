import React, { useEffect, useState } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slice/UserSlice";
import { Grid } from "@mui/material";
import UserVideoComponent from "./UserVideoComponent";


//게임 방 번호 가져옴
// import {} from "../../redux/slice/";

const AllCam = (props) => {
  let OV, session, mySession;
  let ovToken;
  const roomNum = useSelector((state) => state.roomNum);
  const currentUser = useSelector(selectUser);
  const token = useSelector((state) => state.user.accessToken);
  const pubAddr = `/pub/room/${roomNum}`;
  const pubGameAddr = `${pubAddr}/game`;
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [voteIndex, setVoteIndex] = useState(null);
  const [currentTurn, setCurrentTurn] = useState('');
  const [userList, setUserList] = useState([]);
  // let publisher;

  useEffect(() => {
    console.log(props.dead);
    joinSession();

    return () => {
      leaveSession();
    };
  }, []);
  
  useEffect(() => {
    if (props.turn !== currentTurn) {
      console.log('vote reset!');
      setVoteIndex(null);
      setCurrentTurn(props.turn);
    }
  });

  //메인 비디오 컨트롤
  // const handleMainVideoStream = (stream) => {
  //   if (mainStreamManager !== stream) {
  //     mainStreamManager = stream;
  //   }
  // };

  const deleteSubscriber = (streamManager) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      setSubscribers([...subscribers].splice(index, 1));
      setUserList([...userList].splice(index, 1));
    }
  };

  const joinSession = async () => {
    OV = new OpenVidu();
    session = OV.initSession();
    mySession = session;

    mySession.on("streamCreated", (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      const tmpSubscriber = mySession.subscribe(event.stream, undefined);
      // Update the state with the new subscribers
      setSubscribers((currentSubscribers) => [...currentSubscribers, tmpSubscriber]);
      setUserList((currentUserList) => [...currentUserList, JSON.parse(tmpSubscriber.stream.connection.data).clientData])
    });

    mySession.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    await axios({
      url: `/api/room/${roomNum}/video-token`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then(({ data }) => {
        console.log("data: " + data);
        ovToken = data;
      })
      .catch((err) => {
        console.log("get ovToken fail: ", err);
      });

    await mySession
      .connect(ovToken, { clientData: currentUser.nickname })
      .then(async () => {
        props.inCamHandler({ type: "session-connect" });
        props.setCurrentGameState("세션 접속 완료");
        //모든 입출력 장치 불러옴
        const devices = await OV.getDevices();
        console.log(devices);
        //입출력 장치 중 videoInput == 캠만 배열화 후 저장
        const videoDevices = devices.filter((device) => device.kind === "videoinput");

        // --- 5) Get your own camera stream ---

        // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
        // element: we will manage it on our own) and with the desired properties

        let tmpPublisher = OV.initPublisher(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
          publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: false, // Whether you want to start publishing with your video enabled or not
          resolution: "640x400", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });

        // --- 6) Publish your stream ---
        mySession.publish(tmpPublisher);

        // Set the main video in the page to display our webcam and store our Publisher

        setCurrentVideoDevice(videoDevices[0]);
        setMainStreamManager(tmpPublisher);
        setPublisher(tmpPublisher);
      })
      .catch((error) => {
        console.log("There was an error connecting to the session:", error.code, error.message);
      });
  };

  const leaveSession = () => {
    if (mySession) mySession.disconnect();

    OV = null;
    session = undefined;
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
    // publisher = undefined;
  };

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          const newPublisher = OV.initPublisher(undefined, {
            videoSource: null,
            publishAudio: false,
            publishVideo: false,
            mirror: false,
          });

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(mainStreamManager);

          await session.publish(newPublisher);
          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const voteClientPublish = (targetNickname) => {
  console.log('투표 보냄!')
    props.client.publish({
      destination: pubGameAddr,
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({
        type: "vote",
        data: {
          target: targetNickname,
        },
      }),
      skipContentLengthHeader: true,
    });
  }

  const nightActClientPublish = (targetNickname, roleName) => {
    console.log('역할 수행!')
    props.client.publish({
      destination: pubGameAddr,
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({
        type: "night-act",
        data: {
          nickname: currentUser.nickname,
          role: roleName,
          target: targetNickname,
        },
      }),
      skipContentLengthHeader: true,
    });
  }

  const handleVote = (index) => {
    let targetNickname = '';
    setVoteIndex(index);
    if (index < 0) {
      targetNickname = currentUser.nickname;
    } else {
      targetNickname = userList[index];
    }

    console.log(targetNickname, "를 지목함");
    if (props.turn === "vote") {
      setTimeout(() => voteClientPublish(targetNickname), 0);
      setTimeout(() => voteClientPublish(targetNickname), 2000);
      setTimeout(() => voteClientPublish(targetNickname), 4000);
    } else if (props.turn === "night") {
      if (props.role === "마피아") {
        setTimeout(() => nightActClientPublish(targetNickname, "mafia"), 0);
        setTimeout(() => nightActClientPublish(targetNickname, "mafia"), 2000);
        setTimeout(() => nightActClientPublish(targetNickname, "mafia"), 4000);
      } else if (props.role === "경찰") {
        setTimeout(() => nightActClientPublish(targetNickname, "police"), 0);
        setTimeout(() => nightActClientPublish(targetNickname, "police"), 2000);
        setTimeout(() => nightActClientPublish(targetNickname, "police"), 4000);
      } else if (props.role === "의사") {
        setTimeout(() => nightActClientPublish(targetNickname, "doctor"), 0);
        setTimeout(() => nightActClientPublish(targetNickname, "doctor"), 2000);
        setTimeout(() => nightActClientPublish(targetNickname, "doctor"), 4000);
      }
    }
  };

  const isPointer = () => {
    if (props.turn === "vote") {
      return voteIndex === null;
    } else if (props.turn === "night" && props.role !== "시민") {
      return voteIndex === null;
    } else {
      return false;
    }
  };

  const isDead = (index) => {
    if (index < 0) {
      return props.dead.indexOf(currentUser.nickname) >= 0
    }
    else {
      return props.dead.indexOf(userList[index]) >= 0
    }
  }

  return (
    <div>
      <Grid container spacing={2} style={{ height: "500px", padding: "16px" }}>
        <Grid item xs={4}>
          <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0 10px 0" }}>
            {/* 1번 자리 내 캠 */}
            {publisher !== undefined ? (
              <div style={{ height: '200px' }}
                onClick={() => {
                  if (isPointer() && !isDead(-1) && (props.role !== "police" || props.turn === "vote")) handleVote(-1);
                }}
              >
              <UserVideoComponent
                streamManager={publisher}
                self={true}
                isPointer={isPointer() && !isDead(-1) && (props.role !== "police" || props.turn === "vote")}
                isDead={isDead(-1)}
                isNight={props.turn === "night"}
              />
              </div>
            ) : <div style={{ width: '320px', height: '200px' }} />}
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0 10px 0" }}>
            {subscribers[2] !== undefined ? (
              <div style={{ height: '200px' }}>
                <div
                  onClick={() => {
                    if (isPointer() && !isDead(2)) handleVote(2);
                  }}
                >
                  <UserVideoComponent
                    streamManager={subscribers[2]}
                    isPointer={isPointer() && !isDead(2)}
                    isDead={isDead(2)}
                    isNight={props.turn === "night"}
                  />
                </div>
              </div>
            ) : <div style={{ width: '320px', height: '200px' }} />}
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0 10px 0" }}>
            {subscribers[4] !== undefined ? (
              <div style={{ height: '200px' }}>
                <div
                  onClick={() => {
                    if (isPointer() && !isDead(4)) handleVote(4);
                  }}
                >
                  <UserVideoComponent
                    streamManager={subscribers[4]}
                    isPointer={isPointer() && !isDead(4)}
                    isDead={isDead(4)}
                    isNight={props.turn === "night"}
                  />
                </div>
              </div>
            ) : <div style={{ width: '320px', height: '200px' }} />}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0 10px 0" }}>
            {subscribers[0] !== undefined ? (
              <div style={{ height: '200px' }}>
                <div
                  onClick={() => {
                    if (isPointer() && !isDead(0)) handleVote(0);
                  }}
                >
                  <UserVideoComponent
                    streamManager={subscribers[0]}
                    isPointer={isPointer() && !isDead(0)}
                    isDead={isDead(0)}
                    isNight={props.turn === "night"}
                  />
                </div>
              </div>
            ) : <div style={{ width: '320px', height: '200px' }} />}
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0 10px 0" }}>
            {/* 캐릭터 자리 */}
            <div style={{ width: '320px', height: '200px' }} />
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0 10px 0" }}>
            {subscribers[5] !== undefined ? (
              <div style={{ height: '200px' }}>
                <div
                  onClick={() => {
                    if (isPointer() && !isDead(5)) handleVote(5);
                  }}
                >
                  <UserVideoComponent
                    streamManager={subscribers[5]}
                    isPointer={isPointer() && !isDead(5)}
                    isDead={isDead(5)}
                    isNight={props.turn === "night"}
                  />
                </div>
              </div>
            ) : <div style={{ width: '320px', height: '200px' }} />}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0 10px 0" }}>
            {subscribers[1] !== undefined ? (
              <div style={{ height: '200px' }}>
                <div
                  onClick={() => {
                    if (isPointer() && !isDead(1)) handleVote(1);
                  }}
                >
                  <UserVideoComponent
                    streamManager={subscribers[1]}
                    isPointer={isPointer() && !isDead(1)}
                    isDead={isDead(1)}
                    isNight={props.turn === "night"}
                  />
                </div>
              </div>
            ) : <div style={{ width: '320px', height: '200px' }} />}
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0 10px 0" }}>
            {subscribers[3] !== undefined ? (
              <div style={{ height: '200px' }}>
                <div
                  onClick={() => {
                    if (isPointer() && !isDead(3)) handleVote(3);
                  }}
                >
                  <UserVideoComponent
                    streamManager={subscribers[3]}
                    isPointer={isPointer() && !isDead(3)}
                    isDead={isDead(3)}
                    isNight={props.turn === "night"}
                  />
                </div>
              </div>
            ) : <div style={{ width: '320px', height: '200px' }} />}
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 0 10px 0" }}>
            {subscribers[6] !== undefined ? (
              <div style={{ height: '200px' }}>
                <div
                  onClick={() => {
                    if (isPointer() && !isDead(6)) handleVote(6);
                  }}
                >
                  <UserVideoComponent
                    streamManager={subscribers[6]}
                    isPointer={isPointer() && !isDead(6)}
                    isDead={isDead(6)}
                    isNight={props.turn === "night"}
                  />
                </div>
              </div>
            ) : <div style={{ width: '320px', height: '200px' }} />}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AllCam;