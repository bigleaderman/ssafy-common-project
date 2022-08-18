import React, { useState, useEffect, useRef, useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";

//자체 컴포넌트
import MainBar from "../components/GatherRoomPageCom/MainBar";
import PlayMap from "../components/GatherRoomPageCom/PlayMap";
import SideBar from "../components/GatherRoomPageCom/SideBar";
import AllCam from "../components/GameRoomPageCom/AllCam";
import NaviBar2 from "../components/GatherRoomPageCom/NaviBar2";
import { selectUser } from "../redux/slice/UserSlice";
import { selectNightTime, selectTalkTime, selectVoteTime } from "../redux/slice/GameTimeSlice";

//mui 컴포넌트
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styleButton, styleModal } from "../style.js";

//socktjs
import SockJS from "sockjs-client";
import { setInterval } from "stompjs";
import styled from "styled-components";

//howler.js
import { Howl } from "howler";
import Morning from "../Sound/Morning.mp3";
import KillByMafia from "../Sound/KillByMafia.mp3";
import Gavel from "../Sound/Gavel.mp3";
import Night from "../Sound/Night.mp3";

var StompJs = require("@stomp/stompjs");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "gray",
  color: "#ccc",
  border: "1px solid #000",
  boxShadow: 24,
};

const Logo = styled.a`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  img {
    display: block;
    width: 30px;
  }
`;

const GatherRoom = () => {
  console.log("GatherRoom 리랜더링 확인");
  const debugTime = 6;
  const nightTime = useSelector(selectNightTime) + 1;
  const talkTime = useSelector(selectTalkTime) + 1;
  const voteTime = useSelector(selectVoteTime) + 1;
  console.log("talkTime: " + talkTime);
  console.log("voteTime: " + voteTime);
  console.log("nightTime: " + nightTime);

  const NaviBarComRef = useRef();
  const sideComponentRef = useRef();
  const token = useSelector((state) => state.user.accessToken);
  const myNickName = useSelector(selectUser).nickname;
  const roomNum = useSelector((state) => state.roomNum);
  const subAddr = `/sub/room/${roomNum}`;
  const pubAddr = `/pub/room/${roomNum}`;
  const pubGameAddr = `${pubAddr}/game`;
  const [currentGameState, setCurrentGameState] = useState(["게임 준비 중...", "#ccc"]);
  const [IsGameStart, setIsGameStart] = useState(false);
  const [myRole, setMyRole] = useState("");
  const [stateTimer, setStateTimer] = useState(0);
  const timer = useRef();
  const [roleList, setRoleList] = useState([]);
  const [turn, setTurn] = useState("");
  const [dead, setDead] = useState([]);
  const [selectResult, setSelectResult] = useState();
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  let isActResult = "";

  const client = useMemo(
    () =>
      new StompJs.Client({
        //websocket 주소만 입력 가능 * ws://, wss:// 로 시작
        // brokerURL: "https://i7d106.p.ssafy.io:8080/ws",
        connectHeaders: {},
        // debug: function (str) {
        //   console.log(str);
        // },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      }),
    []
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModalOpen = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  client.webSocketFactory = () => {
    return new SockJS("https://i7d106.p.ssafy.io:8080/ws");
  };

  const finishGame = () => {
    setCurrentGameState(["게임 준비 중...", "#ccc"]);
    handleClose();
    setIsGameStart(false);
  };

  const roleClientPublish = () => {
    client.publish({
      destination: pubGameAddr,
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({
        type: "role",
        data: {
          role: myRole,
        },
      }),
      skipContentLengthHeader: true,
    });
  };

  const talkEndClientPublish = () => {
    client.publish({
      destination: pubGameAddr,
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({
        type: "talk-end",
      }),
      skipContentLengthHeader: true,
    });
  };

  const voteResultClientPublish = () => {
    client.publish({
      destination: pubGameAddr,
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({
        type: "vote-result",
      }),
      skipContentLengthHeader: true,
    });
  };

  const nightResultClientPublish = () => {
    client.publish({
      destination: pubGameAddr,
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({
        type: "night-result",
      }),
      skipContentLengthHeader: true,
    });
  };

  const nightCheckClientPublish = () => {
    client.publish({
      destination: pubGameAddr,
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({
        type: "night-check",
      }),
      skipContentLengthHeader: true,
    });
  };

  const voteCheckClientPublish = () => {
    client.publish({
      destination: pubGameAddr,
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({
        type: "vote-check",
      }),
      skipContentLengthHeader: true,
    });
  };

  const onMessageReceived = (payload) => {
    let parsedData = "";
    try {
      parsedData = JSON.parse(payload.body);
    } catch (error) {
      console.log("NOT JSON data: " + payload);
      return;
    }

    console.log("game Process data: ");
    console.log(parsedData);

    //게임 시작 신호 수신
    if (parsedData.type === "session-created") {
      console.log("↑세션 생성 완료");
      setCurrentGameState(["세션 생성 완료", "rgba(255,255,255)"]);
      //게더맵 => 캠 화면 변경
      setIsGameStart(true);
    }
    //게임 시작 신호 수신
    else if (parsedData.type === "game-start") {
      setDead([]);
      setCurrentGameState(["🏁 게임 시작", "rgba(255,255,255)"]);
      //main bar에 낮 시작 문구 작성
    }
    //본인 역할 확인
    else if (parsedData.type === "role") {
      console.log("↑본인 역할 확인");
      setStateTimer(debugTime);
      if (parsedData.data.role === "civil") setMyRole("시민");
      else if (parsedData.data.role === "police") setMyRole("경찰");
      else if (parsedData.data.role === "doctor") setMyRole("의사");
      else if (parsedData.data.role === "mafia") setMyRole("마피아");

      //X초 뒤 역할 확인 소켓 전홍
      setTimeout(() => {
        console.log("역할 확인 종료");
        setTimeout(roleClientPublish, 0);
        // setTimeout(roleClientPublish, 2000);
        // setTimeout(roleClientPublish, 4000);
        // clearInterval(intTimer1);
      }, debugTime * 1000);
      setCurrentGameState(["🕵️‍♂️ 자신의 역할 확인 중", "rgba(255,255,255)"]);
    }
    //낮 시간 시작
    else if (parsedData.type === "talk-start") {
      console.log("↑낮 시작");
      setCurrentGameState(["☀️ 낮이 되었습니다.", "rgba(255,255,255)"]);
      //**************************************** */
      //1. 새소리는 낮 시작될 때마다 재생
      //**************************************** */
      const morningSound = new Howl({ src: [Morning], loop: false, volume: 0.03 });
      morningSound.play();
      setStateTimer(parsedData.data.time);

      setTimeout(() => {
        //낮 시간 종료 신호 전송
        setTimeout(talkEndClientPublish, 0);
        // setTimeout(talkEndClientPublish, 2000);
        // setTimeout(talkEndClientPublish, 4000);
      }, parsedData.data.time * 1000);
    }
    //투표 시작
    else if (parsedData.type === "vote-ready") {
      console.log("↑투표 받는 중");
      console.log("voteTime: " + voteTime);

      setStateTimer(parsedData.data.time);
      setCurrentGameState(["🗳️ 처형할 인물에 투표하십시오.", "rgba(255,255,255)"]);
      setTurn("vote");
      //투표 종료 신호 전송
      setTimeout(() => {
        setTurn("");
        setTimeout(voteResultClientPublish, 0);
        setTimeout(voteResultClientPublish, 2000);
        setTimeout(voteResultClientPublish, 4000);
      }, parsedData.data.time * 1000);
    }
    //투표 종료, 투표 결과 공개
    else if (parsedData.type === "vote-result") {
      setTurn("");
      setDead((currentDead) => [...currentDead, parsedData.data?.dead]);
      //**************************************** */
      //2. 누군가 처형당했다면 땅땅땅 판사 두드리는 소리
      //**************************************** */
      if (parsedData.data?.dead) {
        const GavelSound = new Howl({ src: [Gavel], loop: false, volume: 0.03 });
        GavelSound.play();
      }
      setStateTimer(debugTime);
      setCurrentGameState(["⏱️ 투표가 종료되었습니다.", "rgba(255,255,255)"]);

      //아무도 투표하지 않았다면
      if (parsedData.data === undefined) {
        console.log("아무도 투표하지 않았습니다.");
      } else {
        setSelectResult(parsedData);
      }

      setTimeout(() => {
        setTimeout(voteCheckClientPublish, 0);
        setTimeout(voteCheckClientPublish, 2000);
        setTimeout(voteCheckClientPublish, 4000);
      }, debugTime * 1000);
    }
    //밤 시작
    else if (parsedData.type === "night") {
      console.log("↑밤 시작");
      setCurrentGameState(["🌙 밤이 시작되었습니다.", "rgba(255, 255, 255)"]);
      const NightSound = new Howl({ src: [Night], loop: false, volume: 0.03 });
      NightSound.play();

      setTurn("night");
      setStateTimer(parsedData.data.time);
      setTimeout(() => {
        setTimeout(nightResultClientPublish, 0);
        setTimeout(nightResultClientPublish, 2000);
        setTimeout(nightResultClientPublish, 4000);
      }, parsedData.data.time * 1000);
    }
    // 경찰 활동 결과 데이터
    else if (parsedData.type === "act-result") {
      if (parsedData.type !== isActResult) {
        isActResult = parsedData.type;
        let roleData = "시민";
        if (parsedData.data.role === "mafia") {
          roleData = "마피아";
        } else if (parsedData.data.role === "doctor") {
          roleData = "의사";
        } else if (parsedData.data.role === "police") {
          roleData = "경찰";
        }
        handleModalOpen(parsedData.data.target + "은 " + roleData + "입니다.");
      }
    }
    //밤 투표 결과 데이터
    else if (parsedData.type === "night-result") {
      isActResult = parsedData.type;
      handleModalClose();
      console.log("밤 투표 결과");
      console.log("dead", parsedData.data.dead);
      setDead((currentDead) => [...currentDead, parsedData.data.dead]);
      //**************************************** */
      //3. 마피아가 살해에 성공했다면 탕, 총 소리
      //**************************************** */

      setStateTimer(debugTime);
      setTurn("");
      console.log("밤 선택 결과 데이터: ");

      setTimeout(() => {
        setTimeout(nightCheckClientPublish, 0);
        setTimeout(nightCheckClientPublish, 2000);
        setTimeout(nightCheckClientPublish, 4000);
      }, debugTime * 1000);

      if (parsedData.data.dead.length !== 0) {
        const KillSound = new Howl({ src: [KillByMafia], loop: false, volume: 0.05 });
        KillSound.play();
        setCurrentGameState([
          "🔪 날이 밝았습니다.",
          "rgba(255,255,255)",
          `${parsedData.data.dead[0]}이 마피아에 의해 살해당했습니다.`
        ]);
        console.log("밤 활동 결과");
        console.log("dead", parsedData.data.dead);
        setDead((currentDead) => [...currentDead, parsedData.data.dead[0]]);
      } else {
        console.log("날이 밝고 아무도 안죽었을 때");
        setCurrentGameState(["날이 밝았습니다.", "rgba(255,255,255)", "아무도 죽지 않았습니다."]);
      }
    }
    //게임 종료 신호
    else if (parsedData.type === "gameover") {
      setStateTimer("");
      console.log("↑게임 종료");
      setCurrentGameState([`👑 ${parsedData.data.winner} 승리!`, "rgba(255,255,255)"]);
      setRoleList(parsedData.data.roleInfo);
      handleOpen();
      //게임 종료 후 복귀
    }
  };

  //allcam 컴포에서 상호작용 시 실행될 코드
  const inCamHandler = (res) => {
    if (res.type === "session-connect") {
      client.publish({
        destination: pubGameAddr,
        headers: { token: token, "content-type": "application/json" },
        body: JSON.stringify({
          type: "session-connect",
        }),
        skipContentLengthHeader: true,
      });
    }
  };

  client.onConnect = (frame) => {
    // client.subscribe(subAddr, childComponentRef.current.onMessageReceived);
    //채팅, 동일 방 접속 유저 목록 확인용
    console.log("GRP onCon");
    client.subscribe(subAddr, NaviBarComRef.current.isHostMsgRsv);
    client.subscribe(subAddr, sideComponentRef.current.onMessageReceived);
    //게임 관련 소켓 전송
    client.subscribe(`${subAddr}/game`, onMessageReceived);
    //직업 전용 메세지 소켓 수신
    client.subscribe(`${subAddr}/game/${myNickName}`, onMessageReceived);
  };

  client.activate();

  useEffect(() => {
    //소켓 연결 코드는 한번만 랜더링

    return () => {
      finishGame();
      client.publish({
        destination: pubAddr,
        headers: { token: token, "content-type": "application/json" },
        body: JSON.stringify({
          header: {
            type: "leave",
          },
          data: {
            nickname: myNickName,
          },
        }),
        skipContentLengthHeader: true,
      });
      client.deactivate();
    };
  }, []);

  const MafList = () => {
    return roleList
      .filter((user) => user.role === "mafia")
      .map((data) => {
        return <span key={data.nickname}>{data.nickname}</span>;
      });
  };

  return (
    <>
      <Container
        sx={{ height: "100vh", display: "flex", alignItems: "center", minWidth: "1500px" }}
      >
        <Modal open={modalOpen} onClose={handleModalClose} aria-labelledby='modal-title'>
          <Box
            sx={{
              ...styleModal,
              width: 400,
              backgroundColor: "rgba(30,30,30,0.9)",
              border: "3px solid #999",
            }}
          >
            <h2 id='modal-title'>{modalMessage}</h2>
            <Button
              sx={{ ...styleButton, width: 35, position: "relative", left: 125, top: 10 }}
              onClick={handleModalClose}
            >
              확인
            </Button>
          </Box>
        </Modal>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Grid sx={{ marginTop: "0px" }}>
              <Paper
                elevation={3}
                sx={{
                  maxHeight: "120px",
                  minHeight: "120px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  border: "rgba(0,0,0) 1px solid",
                  borderRadius: "2px",
                }}
              >
                {/* 좌상 */}
                <MainBar
                  currentGameState={currentGameState}
                  myRole={myRole}
                  timer={timer}
                  stateTimer={stateTimer}
                />
              </Paper>
            </Grid>
            <Grid sx={{ marginTop: "25px" }}>
              {/* 좌하 */}
              <Paper
                elevation={3}
                sx={{
                  minHeight: "650px",
                  maxHeight: "650px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  border: "rgba(0,0,0) 1px solid",
                  borderRadius: "2px",
                }}
              >
                {IsGameStart ? (
                  <AllCam
                    inCamHandler={inCamHandler}
                    setCurrentGameState={setCurrentGameState}
                    turn={turn}
                    role={myRole}
                    client={client}
                    dead={dead}
                  />
                ) : (
                  <PlayMap />
                )}
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid>
              <Paper
                elevation={3}
                sx={{
                  minHeight: "120px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  border: "rgba(0,0,0) 1px solid",
                  borderRadius: "2px",
                }}
              >
                {/* 우상 */}
                <NaviBar2
                  ref={NaviBarComRef}
                  IsGameStart={IsGameStart}
                  setIsGameStart={setIsGameStart}
                  client={client}
                />
              </Paper>
            </Grid>
            <Grid sx={{ marginTop: "25px", height: "100%" }}>
              {/* 우하 */}
              <Paper
                elevation={3}
                sx={{
                  minHeight: "650px",
                  maxHeight: "650px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  border: "rgba(0,0,0) 1px solid",
                  borderRadius: "2px",
                }}
              >
                <SideBar ref={sideComponentRef} client={client} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {/* 간단 정보 포함 */}
        <Modal
          open={open}
          onClose={finishGame}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Box
              sx={{
                width: 400,
                height: 35,
                backgroundColor: "var(--color-5);",
                borderTopLeftRadius: "2px",
                borderTopRightRadius: "2px",
              }}
            >
              <Logo>
                <img src='logo.svg' alt='logo' />
              </Logo>
            </Box>
            <Container style={{ backgroundColor: "#ccc" }}>
              <Typography
                id='modal-modal-title'
                variant='h6'
                component='h2'
                sx={{ color: "black" }}
              >
                {currentGameState[0]}
              </Typography>
              <Typography
                id='modal-modal-description'
                sx={{ mt: 2, color: "black", textAlign: "center" }}
              >
                마피아는 &nbsp;
                <MafList /> &nbsp; 입니다.
              </Typography>
              {/* 확인 시 모달 닫기 && 세션 종료 && 대기방 복귀 */}
              <Button
                style={{
                  marginLeft: 40,
                  border: "solid 2px var(--color-2)",
                  color: "var(--color-2)",
                  backgroundColor: "var(--color-5)",
                  margin: "20px 35px",
                  padding: "2px 10px",
                  borderRadius: "2px",
                  fontSize: "16px",
                  marginLeft: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                  width: "100px",
                  height: "40px",
                }}
                onClick={finishGame}
              >
                확인
              </Button>
              {/* 중첩 모달창 생성 */}
              <Button
                style={{
                  marginLeft: 40,
                  border: "solid 2px var(--color-2)",
                  color: "var(--color-2)",
                  backgroundColor: "var(--color-5)",
                  margin: "20px 35px",
                  padding: "2px 10px",
                  borderRadius: "2px",
                  fontSize: "16px",
                  marginLeft: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                  width: "100px",
                  height: "40px",
                }}
              >
                자세히
              </Button>
            </Container>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default GatherRoom;
