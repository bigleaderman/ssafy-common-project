import React, { useState } from "react";
import styled from "styled-components";
import { Container, Button, Modal, Box, Typography, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/PulseButton.css";

import { useSelector, useDispatch } from "react-redux";
import { enrollNickname } from "../redux/slice/UserSlice";
import { roomList } from "../redux/slice/RoomListSlice";
import { friendList } from "../redux/slice/FriendListSlice";
import { requestedF } from "../redux/slice/RequestedFSlice";

// 모달 창 style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "gray",
  color: "white",
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

const MainPage = () => {
  const me = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. 게임스타트 버튼 누를 때 상태에 따라 다른 결과
  const clickStart = () => {
    if (!me.accessToken) {
      // 1-1. 로그인이 안 된 상태 -> 로그인 페이지로
      return navigate("/signin");
    } else if (!me.nickname) {
      // 1-2. 로그인 되었지만 닉네임 등록을 안함 -> 2. 닉네임 등록하기
      return handleOpenNick();
    } else {
      // 1-3. 로그인 되어있고 닉네임 등록도 함 -> 4.데이터 저장 + 룸 리스트 페이지로
      return storeData(), navigate("/roomList");
    }
  };
  // 2. 닉네임 등록
  const [openNick, setOpenNick] = useState(false); // 닉네임 모달 관련
  const handleOpenNick = () => {
    setOpenNick(true);
  };
  const handleCloseNick = () => {
    setOpenNick(false);
  };
  const [newNick, setNewNick] = useState(""); // 닉네임
  const [dupNick, setDupNick] = useState(false); // 닉네임 중복 여부
  // 닉네임 중복 검사
  const checkNick = () => {
    axios({
      method: "post",
      url: "/api/user/checkNickname",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${me.accessToken}`,
      },
      data: newNick,
    })
      .then((response) => {
        if (!response.data) {
          setDupNick(true);
          alert("사용 가능한 닉네임입니다!"); // 3. 룸리스트 페이지 가기 버튼 누르기
        } else {
          setDupNick(false);
          alert("이미 존재하는 닉네임입니다!");
        }
      })
      .catch((err) => console.log("실패", err));
  };
  // 3. 닉네임 중복 검사 후 룸 리스트 페이지로
  const goRoomList = () => {
    // 중복 검사 통과 후
    if (dupNick) {
      // 닉네임 등록
      axios({
        method: "put",
        url: "/api/user/enrollNickname",
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ` + me.accessToken,
        },
        data: newNick,
      }).then(() => {
        dispatch(enrollNickname(newNick)); // 리덕스에 닉네임 넣기
        storeData();
        navigate("/roomList"); // 4. 데이터 저장 + 룸 리스트 페이지로
      });
    } else {
      alert("닉네임이 필요합니다.");
    }
  };
  // 4. 데이터 저장(방 목록, 친구 목록, 나에게 친구 신청한 목록 redux)
  const storeData = () => {
    axios // 방 목록
      .get("/api/room/list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${me.accessToken}`,
        },
      })
      .then((response) => {
        dispatch(roomList(response.data));
      });
    axios // 친구 목록
      .get("/api/user/friend/friend-list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${me.accessToken}`,
        },
      })
      .then((response) => {
        dispatch(friendList(response.data));
      });
    axios // 나에게 친구 신청한 목록
      .get("/api/user/friend/request-list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${me.accessToken}`,
        },
      })
      .then((response) => {
        dispatch(requestedF(response.data));
      });
  };

  return (
    <Container maxWidth='lg'>
      <Stack>
        <Box>
          <button
            className='pulse-button'
            variant='outlined'
            onClick={() => {
              clickStart();
            }}
          >
            Game Start
          </button>
        </Box>
      </Stack>

      <Modal
        open={openNick}
        onClose={handleCloseNick}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ ...style, borderRadius: "20px" }}>
          <Box
            sx={{
              width: 402,
              height: 31,
              backgroundColor: "var(--color-5);",
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
              닉네임 등록이 필요합니다.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 1,
                my: 3,
                bgcolor: "gray",
                borderRadius: 1,
              }}
            >
              <TextField
                fullWidth
                id='nickname'
                placeholder='닉네임'
                size='small'
                onChange={(e) => {
                  setNewNick(e.target.value);
                }}
                sx={{ width: "100%", mr: 1 }}
              />
              <Button
                variant='outlined'
                onClick={() => {
                  checkNick();
                }}
                style={{
                  color: "white",
                  border: "solid 2px var(--color-2)",
                  backgroundColor: "var(--color-5)",
                  padding: "2px 10px",
                  borderRadius: "6px",
                  fontSize: "16px",
                  marginLeft: "10px",
                  cursor: "pointer",
                  width: "40%",
                  textDecoration: "none",
                }}
              >
                중복검사
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                p: 1,
                m: 1,
                bgcolor: "gray",
                borderRadius: 1,
              }}
            >
              <Button
                variant='outlined'
                onClick={() => {
                  goRoomList();
                }}
                style={{
                  color: "white",
                  border: "solid 2px var(--color-2)",
                  backgroundColor: "var(--color-5)",
                  padding: "2px 10px",
                  borderRadius: "6px",
                  fontSize: "16px",
                  marginLeft: "10px",
                  cursor: "pointer",
                  width: "40%",
                  textDecoration: "none",
                }}
              >
                게임 시작
              </Button>
              <Button
                variant='outlined'
                onClick={() => {
                  handleCloseNick();
                }}
                size='small'
                sx={{ width: "25%" }}
                style={{
                  color: "white",
                  border: "solid 2px var(--color-2)",
                  backgroundColor: "var(--color-5)",
                  padding: "2px 10px",
                  borderRadius: "6px",
                  fontSize: "16px",
                  marginLeft: "10px",
                  cursor: "pointer",
                  width: "40%",
                  textDecoration: "none",
                }}
              >
                취소
              </Button>
            </Box>
          </Container>
        </Box>
      </Modal>
    </Container>
  );
};

export default MainPage;
