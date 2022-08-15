import React, { useState, forwardRef, useImperativeHandle } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from '@mui/material/colors';

import { Helper } from "../RoomNavCom/Helper";
//MUI 모달 참조: https://mui.com/material-ui/react-modal/
import Modal from "@mui/material/Modal";
import { GameSetting } from "../RoomNavCom/GameSetting";

import { selectUser } from "../../redux/slice/UserSlice";
import { useSelector, useDispatch } from "react-redux";
//라우터 이동 위한 클래스
import { useNavigate } from "react-router-dom";

// 아이콘
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LogoutIcon from "@mui/icons-material/Logout";

import { selectColor, selectX, selectY, setColor, setX, setY } from "../../redux/slice/CharSlice";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgba(240, 240, 240, 1)",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: '2px'
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
      main: '#11cb5f',
    },
  },
});
export const NaviBar2 = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    isHostMsgRsv,
  }));

  const token = useSelector((state) => state.user.accessToken);
  console.log("NaviBar2 리랜더링 체크");
  const dispatch = useDispatch();
  const roomNum = useSelector((state) => state.roomNum);
  const subAddr = `/sub/room/${roomNum}`;
  const pubAddr = `/pub/room/${roomNum}`;
  const myNickName = useSelector(selectUser).nickname;
  //useNavigate 객체 생성
  const navigate = useNavigate();
  const [isHost, setIsHost] = useState(false);
  const isHostMsgRsv = (payload) => {
    let parsedData = JSON.parse(payload.body);
    console.log("NaviBar: ", parsedData);
    if (parsedData.header.type === "join" && parsedData.data.nickname === myNickName) {
      console.log("↑↑↑↑NaviBar isHost↑↑↑: ", parsedData.data.isHost);
      setIsHost(parsedData.data.isHost);
    }
  };
  const GameStarthandler = () => {
    console.log("gamestartHandler");
    props.client.publish({
      destination: `${pubAddr}/game`,
      headers: { token: token },
      body: JSON.stringify({
        type: "ready",
        data: null,
      }),
      skipContentLengthHeader: true,
    });
  };
  const returnListPage = () => {
    //방을 나갈 때 redux의 내 위치 초기화
    dispatch(setY(600));
    dispatch(setX(350));
    //채팅 이벤트 삭제
    if (document.getElementById("text")) {
      document
        .getElementById("text")
        .removeEventListener("keydown", ({ key, composed, target }) => {
          console.log(key + " " + composed + " " + target);
          if (key === "Enter" && composed) {
            props.sendData({ nickname: myNickName, message: target.value });
            target.value = "";
          }
        });
    }

    //leave 신호 전송
    props.client.publish({
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
    navigate("/roomList");
  };

  const [SwitchModalValue, setSwitchModalValue] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = (value) => {
    setSwitchModalValue(value);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const SwitchModals = () => {
    if (SwitchModalValue === 0) {
      return <Helper handleClose={handleClose} />;
    } else if (SwitchModalValue === 1) {
      return <GameSetting setOpen={setOpen} client={props.client} />;
    }
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Stack spacing={1} direction='column' sx={{ p: 2 }}>
          <Stack spacing={1} direction='row'>
            <Button
            sx={{color:'rgba(255,255,255)',border:'rgba(255,255,255) 1px solid',borderRadius: "2px"}}
              variant='outlined'
              size='small'
              onClick={() => {
                handleOpen(0);
              }}
            >
              <QuestionMarkIcon /> {/* 도움말 */}
            </Button>
            <Button
            sx={{color:'rgba(255,255,255)',border:'rgba(255,255,255) 1px solid',borderRadius: "2px"}}
              variant='outlined'
              size='small'
              onClick={() => {
                returnListPage();
              }}
            >
              <LogoutIcon />
            </Button>
          </Stack>
          <Stack spacing={1} direction='row'>
            {isHost === true ? (
              <Button
              sx={{color:'rgba(255,255,255)',border:'rgba(255,255,255) 1px solid',borderRadius: "2px"}}
                variant='outlined'
                size='small'
                onClick={() => {
                  GameStarthandler();
                }}
              >
                게임시작
              </Button>
            ) : null}

            {isHost === true ? (
              <Button
              sx={{color:'rgba(255,255,255)',border:'rgba(255,255,255) 1px solid',borderRadius: "2px"}}
                variant='outlined'
                size='small'
                onClick={() => {
                  handleOpen(1);
                }}
              >
                게임설정
              </Button>
            ) : null}

          </Stack>
        </Stack>
      </ThemeProvider>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              width: 600,
              height: 35,
              backgroundColor: "var(--color-5);",
              borderRadius: '2px'
            }}
          >
            <Logo>
              <img src='logo.svg' alt='logo' />
            </Logo>
          </Box>
          <SwitchModals />
        </Box>
      </Modal>
    </div>
  );
});

export default NaviBar2;
