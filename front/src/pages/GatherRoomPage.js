import React, { useState, useEffect, useRef, useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";

//자체 컴포넌트
import MainBar from "../components/GatherRoomPageCom/MainBar";
import PlayMap from "../components/GatherRoomPageCom/PlayMap";
import SideBar from "../components/GatherRoomPageCom/SideBar";
import AllCam from "../components/GameRoomPageCom/AllCam";
import NaviBar2 from "../components/GatherRoomPageCom/NaviBar2";
import { selectUser } from "../redux/slice/UserSlice";
import { setClient } from "../redux/slice/WsSlice";

//mui 컴포넌트
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

//socktjs
import SockJS from "sockjs-client";
import { setInterval } from "stompjs";
import { Navigate } from "react-router-dom";

var StompJs = require("@stomp/stompjs");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const GatherRoom = () => {
  console.log("GatherRoom 리랜더링 확인");
  const debugTime = 6;
  const NaviBarComRef = useRef();
  const sideComponentRef = useRef();
  const token = useSelector((state) => state.user.accessToken);
  const myNickName = useSelector(selectUser).nickname;
  const roomNum = useSelector((state) => state.roomNum);
  const subAddr = `/sub/room/${roomNum}`;
  const pubAddr = `/pub/room/${roomNum}`;
  const pubGameAddr = `${pubAddr}/game`;
  const [currentGameState, setCurrentGameState] = useState("게임 준비 중...");
  const [IsGameStart, setIsGameStart] = useState(false);
  const [myRole, setMyRole] = useState("");
  const [stateTimer, setStateTimer] = useState(0);
  const timer = useRef();
  const [roleList, setRoleList] = useState([]);
  const [turn, setTurn] = useState(false);
  const [dead, setDead] = useState([]);
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

  client.webSocketFactory = () => {
    return new SockJS("https://i7d106.p.ssafy.io:8080/ws");
  };
  // const client = new StompJs.Client({
  //   //websocket 주소만 입력 가능 * ws://, wss:// 로 시작
  //   // brokerURL: "https://i7d106.p.ssafy.io:8080/ws",
  //   connectHeaders: {},
  //   debug: function (str) {
  //     console.log(str);
  //   },
  //   reconnectDelay: 5000,
  //   heartbeatIncoming: 4000,
  //   heartbeatOutgoing: 4000,
  // });

  const finishGame = () => {
    handleClose();
    setIsGameStart(false);
  };

  const onMessageReceived = (payload) => {
    console.log(payload);
    let parsedData = "";
    try {
      parsedData = JSON.parse(payload.body);
    } catch (error) {
      console.log(payload.body);
      return;
    }

    console.log("game Process data: ");
    console.log(parsedData);

    //게임 시작 신호 수신
    if (parsedData.type === "session-created") {
      console.log("↑세션 생성 완료");
      setCurrentGameState("세션 생성 완료");
      //게더맵 => 캠 화면 변경
      setIsGameStart(true);
    }
    //게임 시작 신호 수신
    else if (parsedData.type === "game-start") {
      setDead([]);
      setCurrentGameState("↑게임 시작");
      //main bar에 낮 시작 문구 작성
    }
    //본인 역할 확인
    else if (parsedData.type === "role") {
      console.log("↑본인 역할 확인");
      // setStateTimer(5);
      setStateTimer(debugTime);
      setMyRole(parsedData.data.role);

      //5초 뒤 역할 확인 소켓 전홍
      setTimeout(() => {
        // clearInterval(intTimer1);
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
      }, debugTime * 1000);
      setCurrentGameState("자신의 역할 확인 중");
    }
    //낮 시간 시작
    else if (parsedData.type === "talk-start") {
      console.log("↑낮 시작");
      setCurrentGameState("낮이 시작되었습니다.");
      // setStateTimer(parsedData.data.time);
      setStateTimer(debugTime);

      setTimeout(() => {
        // clearInterval(intTimer);
        //낮 시간 종료 신호 전송
        client.publish({
          destination: pubGameAddr,
          headers: { token: token, "content-type": "application/json" },
          body: JSON.stringify({
            type: "talk-end",
          }),
          skipContentLengthHeader: true,
        });
      }, debugTime * 1000);
    }
    //
    else if (parsedData.type === "vote-ready") {
      console.log("↑투표 받는 중");
      //  let debugTime = parsedData.data.time;
      // setStateTimer(parsedData.data.time);
      setStateTimer(11);
      setCurrentGameState("처형할 인물에 투표하십시오.");
      setTurn("vote");
      //투표 종료 신호 전송
      setTimeout(() => {
        client.publish({
          destination: pubGameAddr,
          headers: { token: token, "content-type": "application/json" },
          body: JSON.stringify({
            type: "vote-result",
          }),
          skipContentLengthHeader: true,
        });
      }, 11 * 1000);
    }
    //투표 종료, 투표 결과 공개
    else if (parsedData.type === "vote-result") {
      setTurn("");
      setDead((currentDead) => [...currentDead, parsedData.data?.dead]);
      setStateTimer(debugTime);
      setCurrentGameState("투표가 종료되었습니다.");
      console.log(parsedData.data);
      //아무도 투표하지 않았다면
      if (parsedData.data === undefined) {
        console.log("아무도 투표하지 않았습니다.");
      } else {
        // console.log("죽은 사람 목록: ", parsedData.data.list);
        // console.log("죽은 사람: ", parsedData.data.dead);
        // console.log("죽은 사람 직업: ", parsedData.data.role);
      }

      setTimeout(() => {
        client.publish({
          destination: pubGameAddr,
          headers: { token: token, "content-type": "application/json" },
          body: JSON.stringify({
            type: "vote-check",
          }),
          skipContentLengthHeader: true,
        });
      }, debugTime * 1000);
    }
    //밤 시작
    else if (parsedData.type === "night") {
      console.log("↑밤 시작");
      setCurrentGameState("밤이 시작되었습니다.");
      // setStateTimer(parsedData.data.time);
      setStateTimer(debugTime);
      setTurn("night");
      setStateTimer(11);
      setTimeout(() => {
        client.publish({
          destination: pubGameAddr,
          headers: { token: token, "content-type": "application/json" },
          body: JSON.stringify({
            type: "night-result",
          }),
          skipContentLengthHeader: true,
        });
      }, 11 * 1000);
    }
    // 경찰 활동 결과 데이터
    else if (parsedData.type === "act-result") {
      console.log(parsedData.data.target + "은 " + parsedData.data.role + "입니다");
    }
    //밤 투표 결과 데이터
    else if (parsedData.type === "night-result") {
      console.log("밤 투표 결과");
      setDead((currentDead) => [...currentDead, parsedData.data.dead]);
      setStateTimer(debugTime);
      setTurn("");
      console.log("밤 투표 결과 데이터: ");
      // log
      // if(parsedData.data.dead === ){
      //   console.log();
      // }

      setTimeout(() => {
        client.publish({
          destination: pubGameAddr,
          headers: { token: token, "content-type": "application/json" },
          body: JSON.stringify({
            type: "night-check",
          }),
          skipContentLengthHeader: true,
        });
        client.publish({
          destination: pubGameAddr,
          headers: { token: token, "content-type": "application/json" },
          body: JSON.stringify({
            type: "night-act",
            data: {
              nickname: "닉네임",
              role: "자신의 역할",
              target: "목표 닉네임",
            },
          }),
          skipContentLengthHeader: true,
        });
      }, debugTime * 1000);

      if (parsedData.data.dead.length !== 0) {
        setCurrentGameState(
          `날이 밝았습니다. ${parsedData.data.dead[0]}이 마피아에 의해 살해당했습니다.`
        );
      } else {
        setCurrentGameState(`날이 밝았습니다. 아무도 죽지 않았습니다.`);
      }
    }
    //게임 종료 신호
    else if (parsedData.type === "gameover") {
      console.log("↑게임 종료");
      setStateTimer(0);
      setCurrentGameState(`${parsedData.data.winner} 승리!`);
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

    // dispatch(setClient(client));
    let unloadEventLeave = window.addEventListener("unload", () => {
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
    });
    return () => {
      window.removeEventListener("unload", unloadEventLeave);
    };
  }, []);
  const MafList = () => {
    return roleList
      .filter((user) => user.role === "mafia")
      .map((data) => {
        return <span key={data.nickname}>{data.nickname}</span>;
      });
  };
  const handleCloseBtn = () => {
    handleClose();
  };
  return (
    <Container sx={{ height: "100vh", display: "flex", alignItems: "center", minWidth: "1500px" }}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Grid sx={{ marginTop: "0px" }}>
            <Paper
              elevation={3}
              sx={{
                maxHeight: "120px",
                minHeight: "120px",
                backgroundColor: "rgba(0,0,0,0.5)",
                border:'rgba(0,0,0) 1px solid',borderRadius: "2px"
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
            <Paper elevation={3} sx={{ minHeight: "650px", maxHeight: "650px", backgroundColor: "rgba(0,0,0,0.5)", border:'rgba(0,0,0) 1px solid',borderRadius: "2px" }}>
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
              sx={{ minHeight: "120px", backgroundColor: "rgba(0,0,0,0.5)",border:'rgba(0,0,0) 1px solid',borderRadius: "2px" }}
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
              sx={{ minHeight: "650px", maxHeight: "650px", backgroundColor: "rgba(0,0,0,0.5)",border:'rgba(0,0,0) 1px solid',borderRadius: "2px" }}
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
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {currentGameState}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            마피아는
            <MafList />
            입니다.
          </Typography>
          {/* 확인 시 모달 닫기 && 세션 종료 && 대기방 복귀 */}
          <Button onClick={finishGame}>확인</Button>
          {/* 중첩 모달창 생성 */}
          <Button>자세히</Button>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={finishGame}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {currentGameState}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            마피아는
            <MafList />
            입니다.
          </Typography>
          {/* 확인 시 모달 닫기 && 세션 종료 && 대기방 복귀 */}
          <Button onClick={finishGame}>확인</Button>
          {/* 중첩 모달창 생성 */}
          <Button>자세히</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default GatherRoom;
