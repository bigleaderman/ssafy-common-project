import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Modal,
  Box,
  Typography,
  Paper,
  Stack,
  Link,
} from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";
import { useNavigate } from "react-router-dom";
import {middleButton} from "../../style.js"

import { useSelector, useDispatch } from "react-redux";
import { roomNum } from "../../redux/slice/RoomNumSlice";
import { setDoc } from "../../redux/slice/CntDocSlice";
import { setMaf } from "../../redux/slice/CntMafSlice";
import { setCop } from "../../redux/slice/CntCopSlice";
import { setTalkTime, setVoteTime, setNightTime } from "../../redux/slice/GameTimeSlice";
import { setCon } from "../../redux/slice/CntConSlice";
import { setLimit } from "../../redux/slice/CntLimitSlice";
import { SetRoomTitle } from "../../redux/slice/RoomTitleSlice";
import axios from "axios";


const Logo = styled.a`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  img {
    display: block;
    width: 30px;
  }
`;
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
  height:250,
  borderRadius: "2px",
};

function RoomItem({ room }) {
  const me = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [password, setPassWord] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 방 못들어갈 때 모달
  const [reject, setReject] = useState(false);
  const rejectOpen = () => setReject(true);
  const rejectClose = () => setReject(false);

  // 게임 들어가기
  const EnterGame = () => {
    axios
      .post(
        `/api/room/${room.roomSeq}/join`,
        {
          roomSeq: room.roomSeq,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${me.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.roomResponse.capacity - res.data.roomResponse.participants > 0) {
          dispatch(roomNum(res.data.roomResponse.roomSeq)); // 방 번호
          dispatch(SetRoomTitle(res.data.roomResponse.title)); // 방 제목
          dispatch(setDoc(res.data.gameInfo.doctorNum)); // 의사 수
          dispatch(setMaf(res.data.gameInfo.mafiaNum)); // 마피아 수
          dispatch(setCop(res.data.gameInfo.policeNum)); // 경찰 수
          dispatch(setVoteTime(res.data.gameInfo.voteTimeoutSec)); // 투표시간
          dispatch(setTalkTime(res.data.gameInfo.talkTimeoutSec)); // 낮 시간
          dispatch(setNightTime(res.data.gameInfo.night)); // 밤 시간
          dispatch(setCon(res.data.roomResponse.participants)); // 방 현재 인원
          dispatch(setLimit(res.data.roomResponse.capacity)); // 방 전체 인원
          navigate("/gatherroom");
        } else {
          handleClose();
          rejectOpen();
        }
      });
  };
  const goGame = () => {
    // 룸 번호 리덕스에 저장
    dispatch(roomNum(room.roomSeq));
    if (room.locked) {
      // 비밀번호 입력 모달 뜨기
      handleOpen();
      setPassWord("");
    } else {
      return EnterGame();
    }
  };

  const CheckPassword = () => {
    EnterGame();
  };

  return (
    <>
      <Link
        underline='none'
        component='button'
        variant='body2'
        onClick={() => {
          goGame();
        }}
      > {room.title === '' ? null: 
        <Paper sx={{ width: "440px", height: "60px", p: 0, ml: 4, backgroundColor:"rgba(255,255,255)", color:"black" ,borderRadius: "2px"}}>
          <Stack direction='row' justifyContent='space-around' alignItems='flex-end' sx={{pt:1}}>
            <h1>{room.title}</h1>
            {room.locked ? <HttpsIcon /> : null}
            {room.participants}/{room.capacity}
          </Stack>
        </Paper>}
      </Link>

      {/* 비밀번호 있는 방 누를 때 뜨는 모달 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{...style,borderRadius: '2px'}}>
          <Box
            sx={{
              width: 397.5,
              height: 31,
              backgroundColor: "var(--color-5);",
              position:'relative',
              bottom:33,
              right:33
            }}
          >
            <Logo>
              <img src='logo.svg' alt='logo' />
            </Logo>
          </Box>
          <Typography id='modal-modal-title' variant='h6' component='h2' sx={{fontSize:30, position:'relative', bottom:20}}>
            비밀번호
          </Typography>
          <input
            style={{border: 'solid 1px var(--color-5)', borderRadius:'2px', height:50, position:'relative', bottom:5}}
            type='password'
            placeholder='Password'
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
          <Button
            sx={{...middleButton, position:'relative', left: 50,borderRadius: '2px'}}
            onClick={() => {
              CheckPassword();
            }}
          >
            확인
          </Button>
          <Button
            sx={{...middleButton, position:'relative', left: 45,borderRadius: '2px'}}
            onClick={() => {
              handleClose();
            }}
          >
            취소
          </Button>
        </Box>
      </Modal>
      {/* 못들어가는 방 누를 때 뜨는 모달 */}
      <Modal
        open={reject}
        onClose={rejectClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        
        <Box sx={{...style, borderRadius: '2px', backgroundColor:'rgba(220, 220, 220, 0.9)'}}>
          <Box
            sx={{
              width: 397.5,
              height: 31,
              backgroundColor: "var(--color-5);",
              borderRadius: '2px',
              position:'relative',
              bottom:33,
              right:33
            }}
          >
            <Logo>
              <img src='logo.svg' alt='logo' />
            </Logo>
          </Box>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            방에 인원이 가득 찼습니다.
          </Typography>
          <Button sx={{...middleButton, position:'relative', left: 100,borderRadius: '2px'}} onClick={() => rejectClose()}>확인</Button>
        </Box>
      </Modal>
    </>
  );
}
export default RoomItem;
