import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { middleButton } from "../../style.js";
import {
  Paper,
  Stack,
  Button,
  Container,
  Modal,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

import { Helper } from "../RoomNavCom/Helper";

// 아이콘
import AddIcon from "@mui/icons-material/Add";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RefreshIcon from "@mui/icons-material/Refresh";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import axios from "axios";
import styled from "styled-components";

// 리덕스 관련
import { useSelector, useDispatch } from "react-redux";
import { roomNum } from "../../redux/slice/RoomNumSlice";
import { SetRoomTitle } from "../../redux/slice/RoomTitleSlice";
import { setDoc } from "../../redux/slice/CntDocSlice";
import { setMaf } from "../../redux/slice/CntMafSlice";
import { setCop } from "../../redux/slice/CntCopSlice";
import { setTalkTime, setVoteTime, setNightTime } from "../../redux/slice/GameTimeSlice";
import { setCon } from "../../redux/slice/CntConSlice";
import { setLimit } from "../../redux/slice/CntLimitSlice";
import { roomList } from "../../redux/slice/RoomListSlice";
import { randomUser } from "../../redux/slice/RandomUserSlice";

// 소켓
import SockJS from "sockjs-client";
import { over } from "stompjs";

// 모달 창 style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgba(255, 255, 255)",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "2px",
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

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blueGrey[50],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

var stompClient = null;
function Nav() {
  // 내 정보
  const me = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. 방생성 관련
  const [openRoom, setOpenRoom] = useState(false); // 방 생성 모달
  const handleOpenRoom = () => {
    // 모달 열기
    setOpenRoom(true);
  };
  const handleCloseRoom = () => {
    // 모달 닫기
    setOpenRoom(false);
  };
  const [titleRoom, setTitleRoom] = useState(""); // 방 제목
  const [oxRoom, setOxRoom] = useState("false"); // 방 비밀번호 유무
  const [passWordRoom, setPassWordRoom] = useState(""); // 방 비밀번호
  const [numRoom, setNumRoom] = useState(6); // 방 최대인원수
  // 방 생성하기
  const goRoom = () => {
    if (titleRoom) {
      // 방 제목과
      if (passWordRoom) {
        // 방 비밀번호 유무
        setOxRoom(true);
      }
      const data = {
        // 전달 데이터
        roomInfo: {
          capacity: numRoom, // 방 최대 인원
          hostUser: me.userSeq,
          isLocked: oxRoom, // 비밀번호 유무
          password: passWordRoom, // 암호
          title: titleRoom,
        },
        gameInfo: {
          // 게임 설정이 담겨있는 DTO
          gameInfoSeq: 0, // 아무 값이나 입력해주세요, DB Primary Key 및 게임 정보 식별자로 방 생성시 자동할당 됩니다.
          day: 0, // 낮 시간
          night: 0, // 밤시간
          doctorNum: 0, // 의사 수
          mafiaNum: 0, // 마피아 수
          policeNum: 0, // 경찰 수
          talkTimeoutSec: 0, // 낮 토론 시간 (단위 sec)
          voteTimeoutSec: 0, // 밤 토론 시간 (단위 sec)
        },
      };
      axios
        .post("/api/room", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${me.accessToken}`,
          },
        })
        .then((res) => {
          // 리덕스 데이터 저장
          dispatch(roomNum(res.data.roomInfo.roomSeq)); // 방 번호
          dispatch(SetRoomTitle(res.data.roomInfo.title)); // 방 제목
          dispatch(setDoc(res.data.gameInfo.doctorNum)); // 의사 수
          dispatch(setMaf(res.data.gameInfo.mafiaNum)); // 마피아 수
          dispatch(setCop(res.data.gameInfo.policeNum)); // 경찰 수
          dispatch(setVoteTime(res.data.gameInfo.voteTimeoutSec)); // 투표시간
          dispatch(setTalkTime(res.data.gameInfo.talkTimeoutSec)); // 낮 시간
          dispatch(setNightTime(res.data.gameInfo.night)); // 밤 시간
          dispatch(setCon(1)); // 방 현재 인원
          dispatch(setLimit(res.data.roomInfo.capacity)); // 방 전체 인원
          // 값 리셋
          setTitleRoom("");
          setPassWordRoom("");
          setNumRoom(6);
          setOxRoom(false);
          // 모달 닫고 게임방으로 이동
          handleCloseRoom();
          navigate("/roompage");
        });
    }
  };

  // 2. 방 목록 리셋
  const getNewRoomList = () => {
    axios
      .get("/api/room/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${me.accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(roomList(response.data));
      });
  };

  // 3. 랜덤 매칭
  let headers = {
    token: `${me.accessToken}`,
  };
  const randomMat = () => {
    // 3-1.소켓 연결
    let Sock = new SockJS("https://i7d106.p.ssafy.io:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };
  // 3-2. 연결이 되었다면
  const onConnected = () => {
    const sendRandomData = {
      header: {
        type: "connection",
      },
      data: {
        userSeq: me.userSeq,
      },
    };
    // 3-3. 구독하고 나 등록
    if (me.redUser) {
      stompClient.subscribe(`/sub/game-matching-reduser`, receivedRandomRed); // 받는 데이터 : 현재 랜덤매칭 대기자 몇명? or 매칭 성공
      stompClient.send(`/pub/game-matching-reduser`, headers, JSON.stringify(sendRandomData));
    } else {
      stompClient.subscribe(`/sub/game-matching-user`, receivedRandom);
      stompClient.send(`/pub/game-matching-user`, headers, JSON.stringify(sendRandomData));
    }
  };
  const onError = (err) => {
    console.log(err);
  };

  // 3-4. 데이터 받기
  // 구독 id
  const [subId, setSubId] = useState(false);
  // 레드 유저
  const [openRandomRed, setOpenRandomRed] = useState(false); // 모달 열고 닫기
  const [randomDataRed, setRandomDataRed] = useState(0); // 소켓에서 받은 데이터
  const receivedRandomRed = (payload) => {
    setSubId(payload.headers.subscription);
    var payloadDataRed = JSON.parse(payload.body);
    if (payloadDataRed.header.type === "RedUserNotCompleted") {
      // 레드 유저 매칭 인원 부족
      setOpenRandomRed(true);
      setRandomDataRed(payloadDataRed.data.num);
    } else if (payloadDataRed.header.type === "RedUserCompleted") {
      // 레드 유저 매칭 성공
      setOpenRandomRed(false);
      // 리덕스 데이터 저장
      dispatch(roomNum(payloadDataRed.data.roomInfo.roomSeq)); // 방 번호
      dispatch(SetRoomTitle(payloadDataRed.data.roomInfo.title)); // 방 제목
      dispatch(setDoc(payloadDataRed.data.gameInfo.doctorNum)); // 의사 수
      dispatch(setMaf(payloadDataRed.data.gameInfo.mafiaNum)); // 마피아 수
      dispatch(setCop(payloadDataRed.data.gameInfo.policeNum)); // 경찰 수
      dispatch(setVoteTime(payloadDataRed.data.gameInfo.voteTimeoutSec)); // 투표시간
      dispatch(setTalkTime(payloadDataRed.data.gameInfo.talkTimeoutSec)); // 낮 시간
      dispatch(setNightTime(payloadDataRed.data.gameInfo.night)); // 밤 시간
      dispatch(setCon(6)); // 방 현재 인원
      dispatch(setLimit(6)); // 방 전체 인원
      dispatch(randomUser(payloadDataRed.data.userInfo));
      navigate("/roompage");
    }
  };
  // 일반 유저
  const [openRandom, setOpenRandom] = useState(false); // 모달 열고 닫기
  const [randomData, setRandomData] = useState(0); // 소켓에서 받은 데이터
  const receivedRandom = (payload) => {
    setSubId(payload.headers.subscription);
    var payloadData = JSON.parse(payload.body);
    if (payloadData.header.type === "GeneralUserNotCompleted") {
      // 일반 유저 매칭 인원 부족
      setOpenRandom(true);
      setRandomData(payloadData.data.num);
    } else if (payloadData.header.type === "GeneralUserCompleted") {
      // 일반 유저 매칭 성공
      setOpenRandom(false); // 모달 창 끄기
      // 리덕스 데이터 저장
      dispatch(roomNum(payloadData.data.roomInfo.roomSeq)); // 방 번호
      dispatch(SetRoomTitle(payloadData.data.roomInfo.title)); // 방 제목
      dispatch(setDoc(payloadData.data.gameInfo.doctorNum)); // 의사 수
      dispatch(setMaf(payloadData.data.gameInfo.mafiaNum)); // 마피아 수
      dispatch(setCop(payloadData.data.gameInfo.policeNum)); // 경찰 수
      dispatch(setVoteTime(payloadData.data.gameInfo.voteTimeoutSec)); // 투표시간
      dispatch(setTalkTime(payloadData.data.gameInfo.talkTimeoutSec)); // 낮 시간
      dispatch(setNightTime(payloadData.data.gameInfo.night)); // 밤 시간
      dispatch(setCon(6)); // 방 현재 인원
      dispatch(setLimit(6)); // 방 전체 인원
      dispatch(randomUser(payloadData.data.userInfo));
      navigate("/roompage");
    }
  };

  // 3-5. 매칭 취소
  const noMat = () => {
    const sendNoRandomR = {
      header: {
        type: "disconnection",
      },
      data: {
        userSeq: me.userSeq,
      },
    };
    // 매칭에서 빠지고 구독 끊고 창 닫고 숫자0으로 바꾸기
    if (me.redUser) {
      stompClient.send(`/pub/game-matching-reduser`, headers, JSON.stringify(sendNoRandomR));
      stompClient.unsubscribe(subId, headers);
      setOpenRandomRed(false);
      setRandomDataRed(0);
    } else {
      stompClient.send(`/pub/game-matching-user`, headers, JSON.stringify(sendNoRandomR));
      stompClient.unsubscribe(subId, headers);
      setOpenRandom(false);
      setRandomData(0);
    }
  };

  // 4. 도움말 + 환경 설정
  const [open, setOpen] = useState(false);
  const [SwitchModalValue, setSwitchModalValue] = useState(0);
  const handleOpen = (value) => {
    setSwitchModalValue(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const SwitchModals = () => {
    if (SwitchModalValue === 0) {
      // 도움말
      return <Helper handleClose={handleClose} />;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "100%",
          p: 1,
          height: "50px",
          backgroundColor: "rgba(0,0,0,0.5)",
          border: "rgba(0,0,0) 1px solid",
          borderRadius: "2px",
        }}
      >
        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
            <Button
              sx={{
                width: "50%",
                color: "rgba(255,255,255)",
                border: "rgba(255,255,255) 1px solid",
                borderRadius: "2px",
              }}
              variant='outlined'
              onClick={() => {
                handleOpenRoom();
              }}
            >
              <AddIcon /> {/* 방생성 버튼 */}
            </Button>
            <Button
              sx={{
                width: "50%",
                color: "rgba(255,255,255)",
                border: "rgba(255,255,255) 1px solid",
                borderRadius: "2px",
              }}
              variant='outlined'
              onClick={() => {
                randomMat();
              }}
            >
              <ShuffleIcon /> {/* 랜덤 매칭 버튼 */}
            </Button>
          </Stack>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
            <Button
              sx={{
                width: "50%",
                color: "rgba(255,255,255)",
                border: "rgba(255,255,255) 1px solid",
                borderRadius: "2px",
              }}
              variant='outlined'
              onClick={() => {
                getNewRoomList();
              }}
            >
              <RefreshIcon /> {/* 방 목록 불러오는 버튼 */}
            </Button>
            <Button
              sx={{
                width: "50%",
                color: "rgba(255,255,255)",
                border: "rgba(255,255,255) 1px solid",
                borderRadius: "2px",
              }}
              onClick={() => {
                handleOpen(0);
              }}
              variant='outlined'
            >
              <QuestionMarkIcon /> {/* 도움말 */}
            </Button>
          </Stack>
        </Stack>
        {/* 방 생성 모달 */}
        <Modal
          open={openRoom}
          onClose={handleCloseRoom}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Box
              sx={{
                width: 600,
                height: 35,
                backgroundColor: "var(--color-5);",
                borderTopLeftRadius: "2px",
                borderTopRightRadius: "2px",
                position: "relative",
                bottom: 1,
              }}
            >
              <Logo>
                <img src='logo.svg' alt='logo' />
              </Logo>
            </Box>
            <Container>
              <Typography
                id='modal-modal-title'
                variant='h6'
                component='h2'
                sx={{
                  my: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                방 만들기
              </Typography>

              <TextField
                sx={{ mb: 2, border: "#262626 solid 1px" }}
                fullWidth
                id='outlined-basic'
                placeholder='RoomTitle'
                onChange={(e) => {
                  setTitleRoom(e.target.value);
                }}
              />

              <TextField
                sx={{ mb: 2, border: "#262626 solid 1px" }}
                fullWidth
                id='outlined-basic'
                placeholder='RoomPassword'
                onChange={(e) => {
                  setPassWordRoom(e.target.value);
                }}
              />

              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>RoomNum</InputLabel>
                <Select
                  sx={{ border: "#262626 solid 1px" }}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={numRoom}
                  onChange={(e) => {
                    setNumRoom(e.target.value);
                  }}
                >
                  <MenuItem value={6}>
                    <h3 style={{ textAlign: "center" }}>6</h3>
                  </MenuItem>
                  <MenuItem value={7}>
                    <h3 style={{ textAlign: "center" }}>7</h3>
                  </MenuItem>
                  <MenuItem value={8}>
                    <h3 style={{ textAlign: "center" }}>8</h3>
                  </MenuItem>
                </Select>
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  p: 1,
                  m: 1,
                  borderRadius: "2px",
                }}
              >
                <Button
                  sx={{
                    ...middleButton,
                    margin: "2px 1px",
                    padding: "2px 1px",
                    position: "relative",
                    left: 30,
                    width: "130px",
                    borderRadius: "2px",
                  }}
                  variant='outlined'
                  onClick={goRoom}
                >
                  방 생성
                </Button>
                <Button
                  variant='outlined'
                  onClick={handleCloseRoom}
                  size='small'
                  sx={{
                    width: "25%",
                    ...middleButton,
                    margin: "2px 1px",
                    padding: "2px 1px",
                    position: "relative",
                    right: 30,
                    width: "130px",
                    borderRadius: "2px",
                  }}
                >
                  취소
                </Button>
              </Box>
            </Container>
          </Box>
        </Modal>
        {/* 일반 랜덤 매칭 모달 */}
        <Modal
          open={openRandom}
          onClose={noMat}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Box
              sx={{
                width: 600,
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
            <Container>
              <Typography
                id='modal-modal-title'
                variant='h6'
                component='h2'
                sx={{
                  my: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                일반 유저 매칭 중
                <br />
                {randomData}명 대기중
                <br />
              </Typography>

              <Button
                onClick={noMat}
                sx={{
                  ...middleButton,
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  left: 215,
                  borderRadius: "2px",
                }}
              >
                매칭 취소
              </Button>
            </Container>
          </Box>
        </Modal>
        {/* 레드 랜덤 매칭 모달 */}
        <Modal
          open={openRandomRed}
          onClose={noMat}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Box
              sx={{
                width: 600,
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
            <Container>
              <Typography
                id='modal-modal-title'
                variant='h6'
                component='h2'
                sx={{
                  my: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                매칭 중...
                <br />
                {randomDataRed}명 대기중
                <br />
              </Typography>

              <Button
                variant='outlined'
                onClick={noMat}
                sx={{
                  ...middleButton,
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  left: 215,
                  borderRadius: "2px",
                }}
              >
                매칭 취소
              </Button>
            </Container>
          </Box>
        </Modal>
        {/* 도움말, 사운드 설정 */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Box
              sx={{
                width: 600,
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
            <SwitchModals />
          </Box>
        </Modal>
      </Paper>
    </ThemeProvider>
  );
}

export default Nav;
