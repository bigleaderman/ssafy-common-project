import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableContainer,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  Button,
  Container,
} from "@mui/material";

function Chat({ Chats }) {
  // 채팅 스크롤 아래로 고정
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth",block: 'end' });
  }, [Chats]);

  const username = useSelector(state => state.user.nickname);
  // 보내는 채팅
  const [userChat, setUserChat] = useState({
    header: {
      type: "chat",
    },
    data: {
      nickname: username,
      message: "",
    },
  });
  // 채팅 적기
  const handleMessage = event => {
    const { value } = event.target;
    setUserChat({
      ...userChat,
      data: {
        nickname: username,
        message: value,
      },
    });
  };

  // 채팅 전송
  const sendValue = () => {
    if (userChat.data.message) {
      Send(userChat);
    }

    setUserChat({
      ...userChat,
      data: {
        nickname: username,
        message: "",
      },
    });
  };
  // 엔터 키 입력
  const handleOnKeyPress = e => {
    if (e.key === "Enter" && userChat.data.message) {
      sendValue(userChat); // Enter 입력이 되면 클릭 이벤트 실행
      setUserChat({
        ...userChat,
        data: {
          nickname: username,
          message: "",
        },
      });
    }
  };

  return (
    <Container>
      <TableContainer style={{ padding: "20px", height: "100px" }} component={Paper}>
        {/* <Table size='medium'> */}
          <TableBody ref={scrollRef}>
            {Chats &&
              Chats.map((chat, index) => (
                  <div key={index}>{chat.data.nickname} : {chat.data.message}</div>

              ))}
          </TableBody>
        {/* </Table> */}
      </TableContainer>
      <input
        type='text'
        style={{ height: 20, width: "100%",border:'rgba(255,255,255) 1px solid',borderRadius: "2px" }}
        value={userChat.data.message}
        onChange={handleMessage}
        onKeyPress={handleOnKeyPress}
      />
    </Container>
  );
}

export default Chat;
